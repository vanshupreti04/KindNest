import React, { useEffect, useState } from 'react';
import './DonationHistory.css';

const DonationHistory = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/items/history');
        if (response.ok) {
          const data = await response.json();
          setItems(data.items);  // Set the items from the backend
        } else {
          console.error('Failed to fetch items');
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="history-section">
      <h2 className="history-heading">Donation History</h2>
      {items.length > 0 ? (
        <div className="history-list">
          {items.map((item) => (
            <div className="history-card" key={item._id}>
              {/* Left Section with Item Details */}
              <div className="item-details">
                <p className="item-title"><strong>Item Name:</strong> {item.itemName}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}</p>
              </div>

              {/* Right Section with Item Image */}
              <div className="item-image">
              <img
                  src={`http://localhost:5000/api/items/item-image/${item._id}`} // Fetch the image from the backend
                  alt={item.itemName}
                  onError={(e) => e.target.src = '/default-avatar.png'} // Fallback image if it fails
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-history-message">No items in donation history yet.</p>
      )}
    </div>
  );
};

export default DonationHistory;