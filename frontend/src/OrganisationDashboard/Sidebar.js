import React from 'react';
import { FaUserCircle, FaMoneyCheckAlt, FaBox, FaEnvelope, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ navigate }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-icons">
        <div className="icon" onClick={() => navigate('/organisation-dashboard/profile')}>
          <FaUserCircle size={24} /> Profile
        </div>
        <div className="icon" onClick={() => navigate('/organisation-dashboard/money')}>
          <FaMoneyCheckAlt size={24} /> Donated Money
        </div>
        <div className="icon" onClick={() => navigate('/organisation-dashboard/items')}>
          <FaBox size={24} /> Items Available
        </div>
        <div className="icon" onClick={() => navigate('/organisation-dashboard/messages')}>
          <FaEnvelope size={24} /> Messages
        </div>
        <div className="icon" onClick={() => navigate('/organisation-dashboard/edit')}>
          <FaEdit size={24} /> Edit Details
        </div>
        <div className="icon logout-button" onClick={() => navigate('/')}>
          <FaSignOutAlt size={24} /> Log Out
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
