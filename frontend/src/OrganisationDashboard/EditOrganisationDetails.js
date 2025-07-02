// EditOrganisationDetails.js
import React, { useState } from 'react';
import './EditOrganisationDetails.css';

const EditOrganisationDetails = ({ organisation }) => {
  const [formData, setFormData] = useState({
    organisationName: organisation.organisationName,
    email: organisation.email,
    address: organisation.address,
    phoneNumber: organisation.phoneNumber,
    aadharNumber: organisation.aadharNumber,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    const organisationId = organisation._id; // Assuming the organisation's ID is passed in the `organisation` prop

    try {
      const response = await fetch(
        `http://localhost:5000/api/organisation/update/${organisationId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage('Successfully updated'); // Success message
        console.log('Organisation details updated:', data);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to update details'); // Error message
        console.error('Update failed:', errorData.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.'); // Error handling
      console.error('Error updating organisation details:', error);
    }

    // Reset the message after a timeout
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };


  return (
    <div className="edit-organisation-details">
      <h2>Edit Organisation Details</h2>
      {message && <p className="message">{message}</p>}
      <div className="form-field">
        <label>Organisation Name</label>
        <input
          type="text"
          name="organisationName"
          value={formData.organisationName}
          onChange={handleChange}
        />
      </div>
      <div className="form-field">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-field">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div className="form-field">
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className="form-field">
        <label>Aadhar Number</label>
        <input
          type="text"
          name="aadharNumber"
          value={formData.aadharNumber}
          onChange={handleChange}
        />
      </div>
      <button className="save-button" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default EditOrganisationDetails;
