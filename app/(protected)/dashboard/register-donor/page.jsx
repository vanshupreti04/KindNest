'use client'
import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../../../lib/firebase'
import { useAuth } from '../../../../components/auth/AuthProvider'

function DonorPage() {
  const { currentUser } = useAuth()
  const [selectedDoc, setSelectedDoc] = useState('')
  const [showDocInput, setShowDocInput] = useState(false)
  const [files, setFiles] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' })

  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    address: {
      building: '',
      area: '',
      city: '',
      state: '',
      pincode: ''
    },
    documentType: '',
    documentId: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleDocChange = (e) => {
    const value = e.target.value
    setSelectedDoc(value)
    setShowDocInput(true)
    setFormData({...formData, documentType: value})
  }

  const handleFileChange = (e) => {
    setFiles([...e.target.files])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      if (!currentUser) {
        throw new Error('You must be logged in to register as a donor')
      }

      // Prepare the donor data
      const donorData = {
        ...formData,
        userId: currentUser.uid,
        email: currentUser.email,
        createdAt: new Date().toISOString(),
        status: 'active',
        verification: 'pending',
        files: files.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type
        }))
      }

      // Add to Firestore
      const docRef = await addDoc(collection(db, 'donors'), donorData)
      
      setSubmitStatus({
        success: true,
        message: 'Donor registration successful! Thank you for your contribution.'
      })

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        mobile: '',
        address: {
          building: '',
          area: '',
          city: '',
          state: '',
          pincode: ''
        },
        documentType: '',
        documentId: ''
      })
      setSelectedDoc('')
      setShowDocInput(false)
      setFiles([])
    } catch (error) {
      console.error("Registration error:", error)
      setSubmitStatus({
        success: false,
        message: error.message || 'Registration failed. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Register As Donor</h1>
      
      {submitStatus.message && (
        <div className={`mb-6 p-4 rounded-md ${
          submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        {/* Personal Information */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
            <input 
              type="text" 
              name="firstName"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Your first name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
            <input 
              type="text" 
              name="lastName"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Your last name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number*</label>
          <input 
            type="tel" 
            name="mobile"
            className="w-full max-w-xs px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
            placeholder="10-digit mobile number"
            pattern="[0-9]{10}"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Address Section */}
        <h2 className="text-sm font-bold uppercase text-gray-700 mb-3 tracking-wider">Address Information</h2>
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Building*</label>
            <input 
              type="text" 
              name="address.building"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Building name/number"
              value={formData.address.building}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Area*</label>
            <input 
              type="text" 
              name="address.area"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Locality/Area"
              value={formData.address.area}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
            <input 
              type="text" 
              name="address.city"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="City"
              value={formData.address.city}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State*</label>
              <input 
                type="text" 
                name="address.state"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="State"
                value={formData.address.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pincode*</label>
              <input 
                type="text" 
                name="address.pincode"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Pincode"
                pattern="[0-9]{6}"
                value={formData.address.pincode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Document Section */}
        <h2 className="text-sm font-bold uppercase text-gray-700 mb-3 tracking-wider">Document Required</h2>
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-end gap-4">
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Document*</label>
            <select 
              className="w-full md:w-48 px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              onChange={handleDocChange}
              value={selectedDoc}
              required
            >
              <option value="">Select document</option>
              <option value="aadhar">Aadhar Card</option>
              <option value="pan">PAN Card</option>
            </select>
          </div>
          
          {showDocInput && (
            <div className="w-full md:w-48">
              <input 
                type="text" 
                name="documentId"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder={
                  selectedDoc === 'aadhar' ? 'Aadhar Number' :
                  'PAN Number'
                }
                pattern={
                  selectedDoc === 'aadhar' ? '[0-9]{12}' :
                  '[A-Z]{5}[0-9]{4}[A-Z]{1}'
                }
                value={formData.documentId}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
        </div>

        {/* Upload Proof Section */}
        <h2 className="text-sm font-bold uppercase text-gray-700 mb-3 tracking-wider">Upload Document</h2>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload document proof*</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer">
              <span className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 border border-gray-300 transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Add Files
              </span>
              <input 
                type="file" 
                className="hidden" 
                onChange={handleFileChange}
                required
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </label>
            <span className="text-sm text-gray-500">
              {files.length > 0 ? `${files.length} file(s) selected` : 'No files selected'}
            </span>
          </div>
          {files.length > 0 && (
            <div className="mt-3 space-y-1">
              {Array.from(files).map((file, index) => (
                <div key={index} className="text-sm text-gray-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {file.name} ({Math.round(file.size / 1024)} KB)
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-2.5 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors disabled:bg-green-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register As Donor'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default DonorPage