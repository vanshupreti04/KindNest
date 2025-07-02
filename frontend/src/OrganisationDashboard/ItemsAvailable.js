import React, { useState, useEffect } from 'react';
import './ItemsAvailable.css';

const ItemsAvailable = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const fetchItems = async (category = '') => {
    try {
      const response = await fetch(`http://localhost:5000/api/items/all-items?category=${category}`);
      if (response.ok) {
        const data = await response.json();
        setItems(data.items);
      } else {
        console.error('Failed to fetch items');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleOpenModal = (item) => {
    setSelectedDonor({
      ...item.donator,
      itemId: item._id, // Store the item's ID for tracking
    });
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedDonor(null);
  };

  const handleAction = (action) => {
    if (action === 'Accept') {
      setShowPopup(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  const handleIgnore = () => {
    if (selectedDonor) {
      setItems(items.filter(item => item._id !== selectedDonor.itemId)); // Filter out the specific item
      setShowPopup(false);
      setSelectedDonor(null);
    }
  };

  return (
    <div className="items-available">
      <div className="items-heading-container">
        <h2 className="items-heading">Items Available for Donation</h2>
      </div>

      <div className="category-buttons-container">
        <h3 className="category-heading">Category</h3>
        <div className="category-buttons">
          <button onClick={() => handleCategoryClick('Food')}>Food</button>
          <button onClick={() => handleCategoryClick('Clothes')}>Clothes</button>
          <button onClick={() => handleCategoryClick('Stationary')}>Stationary</button>
          <button onClick={() => handleCategoryClick('Toys')}>Toys</button>
          <button onClick={() => handleCategoryClick('Blanket')}>Blanket</button>
          <button onClick={() => handleCategoryClick('All')}>All</button>
        </div>
      </div>

      <div className="items-list-1">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              className="item-card-1"
              key={item._id}
              onClick={() => handleOpenModal(item)} // Pass the full item object
              style={{ cursor: 'pointer' }}
            >
              <div className="item-image-1">
                {item.itemPicture?.data ? (
                  <img
                    src={`http://localhost:5000/api/items/item-image/${item._id}`}
                    alt={item.itemName}
                  />
                ) : (
                  <div className="no-image">No Image Available</div>
                )}
              </div>
              <div className="item-details-1">
                <p><strong>Item Name:</strong> {item.itemName}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No items available for donation in this category.</p>
        )}
      </div>

      {showPopup && selectedDonor && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleClosePopup}>
              &times;
            </span>
            <div className="donor-details">
              <h3 className="donor-detail-heading">Donor Details</h3>
              <p><strong>Donator Name:</strong> {selectedDonor.donatorName}</p>
              <p><strong>Phone:</strong> {selectedDonor.donatorPhone}</p>
            </div>
            <div className="action-buttons">
              <button className="agree-button" onClick={() => handleAction('Accept')}>
                Agree
              </button>
              <button className="ignore-button" onClick={handleIgnore}>
                Ignore
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessMessage && (
        <div className="success-message-1">
          <p>Hurry! Ticket Accepted</p>
        </div>
      )}
    </div>
  );
};

export default ItemsAvailable;
