import React, { useEffect, useState } from 'react';
import { FaBuilding, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'; // Importing FontAwesome icons
import './ViewOrganisation.css';

const ViewOrganisation = () => {
  const [organisations, setOrganisations] = useState([]);

  useEffect(() => {
    const fetchOrganisations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/organisation/all');
        const data = await response.json();
        setOrganisations(data.organisations);
      } catch (error) {
        console.error('Error fetching organisations:', error);
      }
    };

    fetchOrganisations();
  }, []);

  return (
    <div className="view-organisation">
      <h1 className="view-org-title">Organisations List</h1>
      <p className="view-org-tagline">
        Trusted Partners<br />
        Building a Better Tomorrow
      </p>
      <div className="organisation-list">
        {organisations.map((org, index) => (
          <div
            className={`organisation-item ${index % 2 === 0 ? 'left-layout' : 'right-layout'}`}
            key={org._id}
          >
            <div className="organisation-image-container">
              <div className="image-wrapper">
                <img
                  src={`http://localhost:5000/api/organisation/profile-picture/${org._id}`}
                  alt={org.organisationName}
                  className="organisation-image"
                />
              </div>
            </div>
            <div className="organisation-details-container">
              <h2 className="organisation-name">
                <FaBuilding className="detail-icon" /> {org.organisationName}
              </h2>
              <p className="organisation-detail">
                <FaMapMarkerAlt className="detail-icon" /> {org.address}
              </p>
              <p className="organisation-detail">
                <FaPhoneAlt className="detail-icon" /> {org.phoneNumber}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewOrganisation;
