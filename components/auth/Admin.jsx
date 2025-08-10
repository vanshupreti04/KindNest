'use client'

import { useState, useEffect } from 'react'
import { collection, query, where, getDocs, addDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../components/auth/AuthProvider'
import { FiLock, FiMail, FiUser } from 'react-icons/fi'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adminId, setAdminId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const { isAdmin, setAdminStatus } = useAuth()

  useEffect(() => {
    if (isAdmin) {
      router.push('/admin-dashboard')
    }
  }, [isAdmin, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Basic validation
      if (!email || !password || !adminId) {
        throw new Error('All fields are required')
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address')
      }

      // Check if admin exists
      const adminsRef = collection(db, 'admins')
      const q = query(
        adminsRef,
        where('email', '==', email.toLowerCase().trim()),
        where('adminId', '==', adminId.trim())
      )

      const querySnapshot = await getDocs(q)
      
      if (querySnapshot.empty) {
        // Admin doesn't exist, create new admin
        const newAdmin = {
          adminId: adminId.trim(),
          email: email.toLowerCase().trim(),
          password: password.trim(), // Note: In production, you should hash passwords!
          isActive: true,
          createdAt: new Date(),
          lastLogin: new Date()
        }

        // Add new admin to Firestore
        const docRef = await addDoc(adminsRef, newAdmin)
        console.log('New admin created with ID: ', docRef.id)
      } else {
        // Admin exists, verify credentials
        const adminDoc = querySnapshot.docs[0]
        const adminData = adminDoc.data()

        // Verify password (in production, use proper hashing!)
        if (adminData.password !== password.trim()) {
          throw new Error('Invalid password')
        }

        // Update last login time
        await updateDoc(adminDoc.ref, {
          lastLogin: new Date()
        })
      }

      // Set admin status in AuthProvider
      setAdminStatus(true)
      
      // Store admin session data
      const sessionData = {
        id: querySnapshot.empty ? 'new-admin' : querySnapshot.docs[0].id,
        email: email.toLowerCase().trim(),
        authenticated: true,
        expires: rememberMe ? Date.now() + (7 * 24 * 60 * 60 * 1000) : Date.now() + (2 * 60 * 60 * 1000)
      }

      localStorage.setItem('adminAuth', JSON.stringify(sessionData))

      router.push('/admin-dashboard')

    } catch (err) {
      setError(err.message)
      console.error('Admin login error:', err)
      // Clear any partial auth state on error
      localStorage.removeItem('adminAuth')
      setAdminStatus(false)
    } finally {
      setLoading(false)
    }
  }

  // Session validation on component mount
  useEffect(() => {
    const validateSession = () => {
      const adminSession = localStorage.getItem('adminAuth')
      if (adminSession) {
        try {
          const session = JSON.parse(adminSession)
          if (session.expires < Date.now()) {
            localStorage.removeItem('adminAuth')
            setAdminStatus(false)
          } else {
            setAdminStatus(true)
            router.push('/admin-dashboard')
          }
        } catch (e) {
          localStorage.removeItem('adminAuth')
          setAdminStatus(false)
        }
      }
    }
    validateSession()
  }, [setAdminStatus, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your credentials to access the dashboard
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="admin-id" className="block text-sm font-medium text-gray-700 mb-1">
                Admin ID
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="admin-id"
                  name="admin-id"
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md"
                  placeholder="ADM-12345"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="6"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <FiLock className="h-5 w-5 text-blue-300 group-hover:text-blue-200" />
                )}
              </span>
              {loading ? 'Verifying...' : 'Continue'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Secure admin portal
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}