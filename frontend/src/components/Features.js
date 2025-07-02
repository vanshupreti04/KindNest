import React from 'react';
import './Features.css';
import { useNavigate } from 'react-router-dom'; // Add your styles for Features

const Features = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="feature">
        <div className="highlighted-image-container">
          <img src="Images/Screenshot 2024-11-20 102754.png" alt="Trusted Organisation" className="highlighted-image" />
        </div>
        <div className="text-content">
          <h3 className="neon-heading">Trusted <span className="half-green">Organisation</span></h3>
          <p className="description">
            Kindnest partners with trusted charities <br />
            to guarantee secure and impactful <br />
            support.
          </p>
          <button className="view-organisation-button" id="viewOrganisation" onClick={() => navigate('/view-organisation')}
            >
            View Organisation</button>
        </div>
      </div>
      <div className="feature-2">
        <div className="highlighted-image-container-2">
          <img src="Images/Screenshot 2024-11-20 162233.png" alt="Seamless Item Sharing" className="highlighted-image-2" />
        </div>
        <div className="text-content-2">
          <h3 className="neon-heading-2">Seamless Item <span className="half-green-2">Sharing</span></h3>
          <p className="description-2">
            Streamlined sharing process for impactful <br />
            item donations to trusted <br />
            organizations.
          </p>
          <button className="view-organisation-button-2" id="itemAvailable" onClick={() => navigate('/item-list')}
          >Items Available</button>
        </div>
      </div>
      <div className="feature-3">
        <div className="highlighted-image-container-3">
          <img src="Images/Screenshot 2024-11-20 233824.png" alt="Real Time Updates" className="highlighted-image-3" />
        </div>
        <div className="text-content-3">
          <h3 className="neon-heading-3">Real Time <span className="half-green-3">Updates</span></h3>
          <p className="description-3">
            Track your contributions in real-time<br />
            ensuring transparency and timely support.
          </p>
          <button className="view-organisation-button-3" id="startTracking"  onClick={() => navigate('/start-tracking')}
          >Start Tracking</button>
        </div>
      </div>
    </div>
  );
};

export default Features;