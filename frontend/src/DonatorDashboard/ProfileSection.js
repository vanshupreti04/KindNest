import React from 'react';
import './ProfileSection.css';

const ProfileSection = ({ donator }) => {
  if (!donator) {
    return <div>Loading profile...</div>;  // Show a loading state if donator is null
  }

  return (
    <div className="profile-section">
      <h1 className="profile-title">Name: {donator.fullName}</h1>
      
      <div className="profile-details">
        <p className="profile-info">Email: {donator.email}</p>
        <p className="profile-info">Address: {donator.address}</p>
        <p className="profile-info">Phone: {donator.phoneNumber}</p>
        <p className="profile-info">Aadhar Number: {donator.aadharNumber}</p>
        
        <button className="authenticate-btn">Authenticate Aadhar</button>
      </div>
    </div>
  );
};

export default ProfileSection;
