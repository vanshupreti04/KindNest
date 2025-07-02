import React, { useState, useEffect } from 'react';
import './EventsPage.css';

const EventsPage = () => {
  
    const [organizations, setOrganizations] = useState([]);
    const [selectedOrg, setSelectedOrg] = useState(null);
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(false); 

    useEffect(() => {
        const fetchOrganizations = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/organisation/all');
            if (response.ok) {
              const data = await response.json();
              setOrganizations(data.organisations); // Set fetched organizations
            } else {
              console.error('Failed to fetch organizations');
            }
          } catch (error) {
            console.error('Error fetching organizations:', error);
          }
        };
    
        fetchOrganizations();
      }, []);
      
      const handleOpenMessage = (org) => {
        setSelectedOrg(org); // Set the selected organization for messaging
    };

  const handleCloseMessage = () => {
    setSelectedOrg(null); // Close the message box
    setMessage(''); // Clear the message
  };

  const handleSendMessage = async () => {
    try {
      const donatorId = localStorage.getItem('donatorId'); // Retrieve logged-in donator's ID
      const response = await fetch('http://localhost:5000/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'donator-id': donatorId, // Pass donator ID in headers
        },
        body: JSON.stringify({
          message,
          organisationId: selectedOrg._id, // ID of the organisation being messaged
        }),
      });
      if (response.ok) {
        setSuccessMessage(true); // Show success message
        setMessage('');
        setSelectedOrg(null);

        // Hide success message after 3 seconds
        setTimeout(() => setSuccessMessage(false), 3000);
      } else {
        const errorData = await response.json();
        console.error('Failed to send message:', errorData.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  return (
    <div className="events-page">
      <h2 className="events-title">Organize Events</h2>

      {successMessage && (
        <div className="success-message">
          Details shared successfully!
        </div>
      )}

      {/* Organization Cards */}
      <div className="organization-cards">
        {organizations.map((org) => (
          <div className="organization-card" key={org._id}>
            <img
              src={`http://localhost:5000/api/organisation/profile-picture/${org._id}`} // Fetch the image from the backend
              alt={org.organisationName}
              className="organization-photo"
              onError={(e) => { e.target.src = '/default-org-photo.jpg'; }} // Fallback image if error
            />
            <h3 className="organization-name">
                <strong>Organisation Name : </strong>{org.organisationName}</h3>
            <p className="organization-info">
              <strong>Address:</strong> {org.address}
            </p>
            <p className="organization-info">
              <strong>Phone:</strong> {org.phoneNumber}
            </p>
            <button
              className="message-button"
              onClick={() => handleOpenMessage(org)}
            >
              Message Them
            </button>
          </div>
        ))}
      </div>

      {/* Message Box */}
      {selectedOrg && (
        <div className="message-box-overlay">
          <div className="message-box">
            <h3 className="message-title">Message {selectedOrg.organisationName}</h3>
            <textarea
              className="message-textarea"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="message-actions">
              <button className="share-button" onClick={handleSendMessage}>
                Share Details
              </button>
              <button className="cancel-button" onClick={handleCloseMessage}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;