import React, { useState } from 'react';
import './AddProfilePicture.css'; // Import CSS file

const AddProfilePicture = ({ onClose, refreshProfile }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProfilePicture = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('profilePicture', selectedImage);
    formData.append('donatorId', localStorage.getItem('donatorId'));

    try {
      const response = await fetch('http://localhost:5000/api/donator/update-profile-picture', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Profile picture updated successfully!');
        onClose(); // Close the modal
        refreshProfile(); // Refresh the profile section
      } else {
        alert('Failed to update profile picture.');
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <div className="modal-overlay">
    <div className="modal-content">
      <h3 className="modal-title">Upload Profile Picture</h3>
      <div className="image-container">
        {preview ? (
          <img src={preview} alt="Preview" className="image-preview" />
        ) : (
          <p className="no-image-text">No image selected</p>
        )}
      </div>
      <div className="change-button">
        <label htmlFor="fileInput" className="choose-file-label">
          Change Profile Picture
        </label>
        <input 
          id="fileInput" 
          type="file" 
          accept="image/*" 
          className="file-input" 
          onChange={handleImageChange} 
        />
      </div>
      <div className="modal-actions">
        <button className="save-button" onClick={handleSaveProfilePicture}>
          Save Changes
        </button>
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  </div>
);
};

export default AddProfilePicture;