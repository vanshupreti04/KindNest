import React, { useState } from 'react';
import './AddProfilePicture.css';

const AddProfilePicture = ({ onClose, refreshProfile, organisationId }) => {
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
    formData.append('organisationId', organisationId);

    try {
      const response = await fetch('http://localhost:5000/api/organisation/update-profile-picture', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Profile picture updated successfully!');
        onClose(); // Close the modal
        refreshProfile(); // Refresh the profile picture in the dashboard
      } else {
        alert('Failed to update profile picture');
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Error uploading profile picture');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Upload Profile Picture</h3>
        {preview ? (
          <img src={preview} alt="Preview" className="image-preview" />
        ) : (
          <p>No image selected</p>
        )}
        <div className="file-section">
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="modal-actions">
          <button className="save-btn" onClick={handleSaveProfilePicture}>
            Save Changes
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProfilePicture;
