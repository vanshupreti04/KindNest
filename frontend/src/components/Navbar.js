import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false); // State to toggle popup visibility

  const handlePopupToggle = () => {
    setShowPopup(!showPopup); // Toggle popup visibility
  };

  return (
    <>
      <nav className="navbar">
        <div className="company-name">KindNest</div>
        <div className="nav-buttons">
          <a href="/signup" className="nav-button">Signup</a>
          <a href="/about" className="nav-button">About Us</a>
          <div className="login-container">
            <a href="/login" className="nav-button login-button">Login</a>
            <div className="dropdown">
              <a href="/login_donator" className="dropdown-button">Login as Donator</a>
              <a href="/login_organisation" className="dropdown-button">Login as Organisation</a>
            </div>
          </div>
          <button className="nav-button" onClick={handlePopupToggle}>Contact</button>
        </div>
      </nav>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={handlePopupToggle}>
        <div className="popup-box" onClick={(e) => e.stopPropagation()}>
          <h2 className="popup-heading">Connect with the Team</h2>
          <div className="popup-content">
            <div className="popup-item">
              <span className="popup-icon">📞</span>
              <span>+91 7453888015</span>
            </div>
            <div className="popup-item">
              <span className="popup-icon">📧</span>
              <span>support@KindNest.com</span>
            </div>
          </div>
          <button className="close-popup" onClick={handlePopupToggle}>
            Close
          </button>
        </div>
      </div>
      )}
    </>
  );
};

export default Navbar;
