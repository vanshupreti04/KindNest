import React from 'react';
import { FaUser, FaHistory, FaDonate, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ navigate }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-icons">
        <div className="icon" onClick={() => navigate('/donator-dashboard/profile')}>
          <FaUser size={24} /> Profile
        </div>
        <div className="icon" onClick={() => navigate('/donator-dashboard/history')}>
          <FaHistory size={24} /> History
        </div>
        <div className="icon" onClick={() => navigate('/donator-dashboard/donate')}>
          <FaDonate size={24} /> Donate Now
        </div>
        <div className="icon" onClick={() => navigate('/donator-dashboard/edit-profile')}>
          <FaEdit size={24} /> Edit Profile
        </div>
        <div className="icon logout-button" onClick={() => navigate('/')}>
          <FaSignOutAlt size={24} /> Log Out
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
