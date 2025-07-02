// DonatedMoney.js
import React from 'react';
import './DonatedMoney.css';

const DonatedMoney = () => {
  return (
    <div className="donated-money">
      <h2>Donated Money</h2>
      <p>Here is the record of donated money to your organisation.</p>
      {/* You can dynamically populate this from an API */}
      <div className="donation-record">
        <p><strong>Amount:</strong> $500</p>
        <p><strong>Date:</strong> 01/01/2024</p>
        <p><strong>Donor:</strong> John Doe</p>
      </div>
      <div className="donation-record">
        <p><strong>Amount:</strong> $200</p>
        <p><strong>Date:</strong> 05/01/2024</p>
        <p><strong>Donor:</strong> Jane Smith</p>
      </div>
    </div>
  );
};

export default DonatedMoney;
