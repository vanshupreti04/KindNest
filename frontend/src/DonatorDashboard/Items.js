import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Items.css';

const Items = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [itemList, setItemList] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false); // For showing success message

  const navigate = useNavigate(); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

   // Submit the item to the backend
   const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('quantity', quantity);
    formData.append('category', category);
    formData.append('image', document.querySelector('input[type="file"]').files[0]);
    formData.append('donatorId', localStorage.getItem('donatorId')); // Assuming donator details are stored in localStorage
    formData.append('donatorName', localStorage.getItem('donatorName'));
    formData.append('donatorPhone', localStorage.getItem('donatorPhone'));

    try {
      const response = await fetch('http://localhost:5000/api/items/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newItem = { itemName, quantity, category };
        setItemList([...itemList, newItem]); // Add the new item to the list on the right side
        setSuccessMessage(true); // Show success message
        setTimeout(() => setSuccessMessage(false), 3000); // Hide message after 3 seconds
        
        // Clear the form fields
        setItemName('');
        setQuantity('');
        setCategory('');
        setImagePreview(null);
      } else {
        alert('Failed to add item');
      }
    } catch (error) {
      console.error('Error submitting item:', error);
      alert('Error submitting item');
    }
  };


  const handleConfirmList = () => {
    // Navigate to the Donator Dashboard when the button is clicked
    navigate('/donator-dashboard');
  };

  return (
    <div className="items-page">
      {/* Left Tagline Section */}
      <div className="tagline-box">
        <div className="tagline">
          <span>
          Your{"\n"}Contribution{"\n"}Matters{"\n"}To{"\n"}Everyone
          </span>
        </div>
      </div>

      {/* Middle Form Section */}
      <div className="items-container">
        <h2 className="form-title">Enter Item Details</h2>

        <div className="form-section">
          <label>Item Name</label>
          <input
            type="text"
            placeholder="Enter the name of the item"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>

        <div className="form-section">
          <label>Quantity</label>
          <input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="form-section">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>Select Category</option>
            <option value="food">Food</option>
            <option value="clothes">Clothes</option>
            <option value="blanket">Blanket</option>
            <option value="toys">Toys</option>
            <option value="stationary">Stationary</option>
          </select>
        </div>

        <div className="form-section">
          <label>Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="submit-section">
          <button className="submit-button" onClick={handleSubmit}>
            List the Item
          </button>
        </div>

        {/* Success Message Popup */}
        {successMessage && (
          <div className="success-popup">
            <p>Item added successfully!</p>
          </div>
        )}

      </div>

      {/* Right Section: Image Preview and Item List */}
      <div className="right-side">
        {/* Image Preview */}
        <div className="image-preview-container">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" />
          ) : (
            <p style={{ color: '#ff9900' }}>Image preview will appear here</p>
          )}
        </div>

        {/* Item List */}
        <div className="item-list">
          <h3>Item List</h3>
          <ul>
            {itemList.map((item, index) => (
              <li key={index}>
                <span>{item.itemName} (x{item.quantity})</span>
                <span>{item.category}</span>
              </li>
            ))}
          </ul>
          <div className="confirm-button-container">
            <button className="confirm-list-button" onClick={handleConfirmList}>
              Confirm List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;