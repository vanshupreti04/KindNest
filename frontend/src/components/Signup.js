import React from 'react';
import './Signup.css'; 
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleOrganisationClick = () => {
    navigate('/signup_organisation'); 
  };

  const handleDonorClick = () => {
    navigate('/signup_donor'); 
  };

  return (
    <div className="signup-page">
      <h1 className="signup-heading">Welcome to KindNest</h1>
      <div className="signup-blocks-container">
        <div
          className="signup-block signup-block-left"
          onClick={handleOrganisationClick}
        >
          <p>Signup as Organisation</p>
        </div>
        <div
          className="signup-block signup-block-right"
          onClick={handleDonorClick}
        >
          <p>Signup as Donor</p>
        </div>
      </div>
    </div>
  );
};

export default Signup