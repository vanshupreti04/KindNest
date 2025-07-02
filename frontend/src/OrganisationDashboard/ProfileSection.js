import React from 'react';
import './ProfileSection.css';

const ProfileSection = ({ organisation }) => {
  if (!organisation) {
    return <div>Loading profile...</div>; // Show loading state if organisation data is not available
  }

  return (
    <div className="profile-section-1">
      <h1 className="profile-title-1">Organisation Name: {organisation.organisationName}</h1>
      <div className="profile-details-1">
        <p className="profile-info-1">Email: {organisation.email}</p>
        <p className="profile-info-1">Address: {organisation.address}</p>
        <p className="profile-info-1">Phone: {organisation.phoneNumber}</p>
        <p className="profile-info-1">Aadhar Number: {organisation.aadharNumber}</p>

        <button className="authenticate-btn">Authenticate Aadhar</button>
      </div>
    </div>
  );
};

export default ProfileSection;
