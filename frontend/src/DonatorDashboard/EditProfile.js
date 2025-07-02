import React, { useState } from 'react';
import './EditProfile.css';

const EditProfile = ({ donator }) => {
  const [formData, setFormData] = useState(donator || {});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/donator/update/${donator._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Profile updated successfully');
        alert('Profile updated successfully!');
      } else {
        console.error('Error updating profile');
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (!donator) {
    return <div>Loading profile data...</div>;
  }

  return (
    <div className="edit-profile-section">
      <h2 className="edit-profile-heading">Edit Profile</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName || ''}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email || ''}
          onChange={handleChange}
        />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Address"
          value={formData.address || ''}
          onChange={handleChange}
        />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber || ''}
          onChange={handleChange}
        />

        <label htmlFor="aadharNumber">Aadhar Number</label>
        <input
          type="text"
          id="aadharNumber"
          name="aadharNumber"
          placeholder="Aadhar Number"
          value={formData.aadharNumber || ''}
          onChange={handleChange}
        />

        <button type="submit" className="save-button-1">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
