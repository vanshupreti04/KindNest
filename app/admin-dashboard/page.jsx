'use client'
import { useState, useEffect } from 'react'
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useAuth } from '../../components/auth/AuthProvider'
import { FiSettings, FiUsers, FiHome, FiLogOut, FiCheckCircle, FiXCircle, FiX } from 'react-icons/fi'

export default function AdminDashboard() {
  const { currentUser, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('ngos')
  const [pendingItems, setPendingItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    fetchPendingItems()
  }, [activeTab])

  const fetchPendingItems = async () => {
    try {
      setLoading(true)
      const collectionName = activeTab === 'ngos' ? 'ngos' : 'donors'
      const q = query(
        collection(db, collectionName),
        where('basicInfo.status', '==', 'pending')
      )
      
      const querySnapshot = await getDocs(q)
      setPendingItems(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })))
    } catch (error) {
      console.error('Error fetching pending items:', error)
      showNotification('Error fetching data', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleVerification = async (id, status) => {
    try {
      // Confirm before rejecting/deleting
      if (status === 'rejected' && !window.confirm('Are you sure you want to reject and delete this entry? This action cannot be undone.')) {
        return
      }

      const collectionName = activeTab === 'ngos' ? 'ngos' : 'donors'
      const docRef = doc(db, collectionName, id)
      
      if (status === 'approved') {
        await updateDoc(docRef, {
          'basicInfo.status': 'verified',
          'verification.verified': true,
          'verification.verifiedBy': 'admin',
          'verification.verifiedAt': new Date().toISOString(),
          'basicInfo.lastUpdated': new Date().toISOString()
        })
        showNotification('Successfully approved!', 'success')
      } else {
        await deleteDoc(docRef)
        showNotification('Entry rejected and deleted', 'success')
      }
      
      fetchPendingItems()
    } catch (error) {
      console.error('Error updating status:', error)
      showNotification('Failed to process request', 'error')
    }
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">KindNest</h1>
          {currentUser && (
            <p className="text-xs text-gray-500 mt-1">
              Logged in as: {currentUser.email}
            </p>
          )}
        </div>
        <nav className="p-4 flex flex-col h-[calc(100%-80px)]">
          <ul className="space-y-2 flex-1">
            <li>
              <button
                onClick={() => setActiveTab('ngos')}
                className={`flex items-center w-full p-2 rounded-md ${
                  activeTab === 'ngos' 
                    ? 'bg-gray-100 font-medium' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <FiHome className="mr-3" />
                NGOs
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('donors')}
                className={`flex items-center w-full p-2 rounded-md ${
                  activeTab === 'donors' 
                    ? 'bg-gray-100 font-medium' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <FiUsers className="mr-3" />
                Donors
              </button>
            </li>
            <li>
              <button
                className="flex items-center w-full p-2 rounded-md hover:bg-gray-50"
              >
                <FiSettings className="mr-3" />
                Settings
              </button>
            </li>
          </ul>
          <button 
            onClick={logout}
            className="flex items-center w-full p-2 rounded-md hover:bg-red-50 text-red-600 mt-auto"
          >
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab === 'ngos' ? 'Pending NGO Registrations' : 'Pending Donor Registrations'}
            </h2>
            <div className="flex border rounded-md">
              <button
                onClick={() => setActiveTab('ngos')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'ngos' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                NGOs
              </button>
              <button
                onClick={() => setActiveTab('donors')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'donors' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Donors
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {notification && (
            <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 flex items-start ${
              notification.type === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <div className="flex-shrink-0 pt-0.5">
                {notification.type === 'success' ? (
                  <FiCheckCircle className="h-5 w-5" />
                ) : (
                  <FiXCircle className="h-5 w-5" />
                )}
              </div>
              <div className="ml-3 w-0 flex-1">
                <p className="text-sm font-medium">{notification.message}</p>
              </div>
              <button 
                onClick={() => setNotification(null)} 
                className="ml-4 flex-shrink-0"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : pendingItems.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No pending {activeTab === 'ngos' ? 'NGOs' : 'Donors'} found
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SR No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {activeTab === 'ngos' ? 'NGO Name' : 'Donor Name'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingItems.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-sm text-gray-900">
                        {activeTab === 'ngos' ? item.basicInfo.ngoName : `${item.basicInfo.firstName} ${item.basicInfo.lastName}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.basicInfo.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="capitalize">{item.documents?.type}</span>: {item.documents?.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleVerification(item.id, 'approved')}
                            className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50"
                            title="Approve"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleVerification(item.id, 'rejected')}
                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                            title="Reject"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}