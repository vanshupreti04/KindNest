import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './DonateNow.css';

const DonateNow = () => {
  const navigate = useNavigate(); 

  return (
    <div className="donate-section">
      <h2 className="section-title">Donate Now</h2>
      <div className="donate-cards">
        {/* Money Card */}
        <div className="donate-card money-card">
          <h3>Money</h3>
          <p>
            Donate money to help NGOs providing essential services, building
            schools, hospitals, and supporting causes for the needy.
          </p>
          <button 
            className="continue-button" 
            onClick={() => navigate('/money')}
          >
            Continue
          </button>
        </div>

        {/* Items Card */}
        <div className="donate-card items-card">
          <h3>Items</h3>
          <p>
            Donate essential items like clothes, food, and household goods to
            support underprivileged families and individuals in need.
          </p>
          <button 
            className="continue-button" 
            onClick={() => navigate('/items')}
          >
            Continue
          </button>
        </div>

        {/* Events Card */}
        <div className="donate-card events-card">
          <h3>Events</h3>
          <p>
            Organize events or drives to help those in need, such as food
            distributions or awareness campaigns.
          </p>
          <button
            className="continue-button"
            onClick={() => navigate('/events')} // Navigate to EventsPage
          >Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonateNow;
