import React, { useState } from 'react';
import './Money.css'; // Import your custom CSS for styling

const Money = () => {
  const [donationAmount, setDonationAmount] = useState(0);

  const handleSliderChange = (event) => {
    setDonationAmount(event.target.value);
  };

  return (
    <div className="money-section">
      <h2 className="section-title">Donate Money</h2>
      <p className="tagline">Together, we can make a change!</p>

      <div className="donation-container">
        <h3 className="donation-heading">Choose an amount to donate</h3>
        
        <div className="donation-form">
          <input
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            className="amount-input"
            placeholder="Enter amount"
          />

          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="1000"
              value={donationAmount}
              onChange={handleSliderChange}
              className="amount-slider"
            />
            <span className="slider-value">${donationAmount}</span>
          </div>

          <button className="donate-button">Donate Now</button>
        </div>
      </div>
    </div>
  );
};

export default Money;
