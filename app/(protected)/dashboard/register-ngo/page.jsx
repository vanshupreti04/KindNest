'use client'
import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../../../lib/firebase' // Your Firebase configuration
import { useAuth } from '../../../../components/auth/AuthProvider' // Your auth context

export default function Page() {
  const { currentUser } = useAuth()
  const [selectedDoc, setSelectedDoc] = useState('')
  const [showDocInput, setShowDocInput] = useState(false)
  const [establishedDate, setEstablishedDate] = useState('')
  const [files, setFiles] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' })

  // Form data state
  const [formData, setFormData] = useState({
    ngoName: '',
    ownerName: '',
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

  const handleDocChange = (e) => {
    const value = e.target.value
    setSelectedDoc(value)
    setShowDocInput(true)
    setFormData({...formData, documentType: value})
  }

  const handleFileChange = (e) => {
    setFiles([...e.target.files])
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      if (!currentUser) {
        throw new Error('You must be logged in to register an NGO')
      }

      // Prepare the NGO data with user UID
      const ngoData = {
        ...formData,
        establishedDate,
        createdBy: currentUser.uid,
        createdAt: new Date().toISOString(),
        status: 'pending',
        files: files.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type
          // Note: You're not uploading files, just storing metadata
        }))
      }

      // Add to Firestore
      const ngosCollection = collection(db, 'ngos');
      const docRef = await addDoc(collection(db, 'ngos'), ngoData)
      
      setSubmitStatus({
        success: true,
        message: `NGO registered successfully! ID: ${docRef.id}`
      })

      // Reset form
      setFormData({
        ngoName: '',
        ownerName: '',
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
      setEstablishedDate('')
      setFiles([])
    } catch (error) {
    console.error("Firestore error:", error);
    setSubmitStatus({
      success: false,
      message: error.message || 'Failed to register NGO'
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Register Your NGO</h1>
      
      {submitStatus.message && (
        <div className={`mb-6 p-4 rounded-md ${
          submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        {/* Basic Information Section */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NGO Name*</label>
            <input 
              type="text" 
              name="ngoName"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="NGO full name"
              value={formData.ngoName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name*</label>
            <input 
              type="text" 
              name="ownerName"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Founder name"
              value={formData.ownerName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Established Date */}
        <div className="mb-6 flex justify-center">
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-1">Established Date*</label>
            <input 
              type="date" 
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              value={establishedDate}
              onChange={(e) => setEstablishedDate(e.target.value)}
              required
            />
          </div>
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
              <option value="darpan">NGO Darpan ID</option>
              <option value="company">Company Registration</option>
              <option value="pancard">PAN Card</option>
            </select>
          </div>
          
          {showDocInput && (
            <div className="w-full md:w-48">
              <input 
                type="text" 
                name="documentId"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder={
                  selectedDoc === 'darpan' ? 'Darpan ID' :
                  selectedDoc === 'company' ? 'Registration No' :
                  'PAN Number'
                }
                value={formData.documentId}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
        </div>

        {/* Upload Proof Section (Storing metadata only) */}
        <h2 className="text-sm font-bold uppercase text-gray-700 mb-3 tracking-wider">Upload Proof</h2>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload supporting documents*</label>
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
                multiple
                required
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
            className="px-8 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400"
            disabled={isSubmitting || !currentUser}
          >
            {isSubmitting ? 'Registering...' : 'Register NGO'}
          </button>
        </div>
      </form>
    </div>
  )
}