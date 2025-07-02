import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupDonator.css';

const SignupDonator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
    aadharNumber: '',
  });
  const [step, setStep] = useState('signup'); 
  const [otp, setOtp] = useState(''); 
  const [error, setError] = useState(''); 
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false); // Success state to show the popup


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const otpResponse = await fetch('http://localhost:5000/api/auth/generate-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, userType: 'donator', userData: formData }),
      });

      if (otpResponse.ok) {
        const { message } = await otpResponse.json();
        console.log('OTP generation response:', message);
        setStep('otp'); 
      } else {
        const otpError = await otpResponse.json();
        console.error('Failed to generate OTP:', otpError.message);
        setError(otpError.message || 'Failed to generate OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP generation:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const otpResponse = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      if (otpResponse.ok) {
        console.log('OTP verified successfully.');
        // Set success message state to show the popup
        setIsSignUpSuccess(true);
        // Redirect to home page after OTP is verified
        setTimeout(() => {
          navigate('/'); // Redirect to home page
        }, 2000); // Wait 2 seconds to show the popup before redirect
      } else {
        const otpError = await otpResponse.json();
        console.error('Failed to verify OTP:', otpError.message);
        setError(otpError.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="signup-donator-page">
      {step === 'signup' ? (
        <>
          <h1 className="signup-donator-heading">Signup as Donator</h1>
          {error && <p className="error-message">{error}</p>}
          <form className="signup-donator-form" onSubmit={handleSignup}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="aadharNumber"
              placeholder="Aadhar Number"
              value={formData.aadharNumber}
              onChange={handleChange}
              required
            />
            <button type="submit" className="confirm-signup-button">
              Confirm Signup
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className="signup-donator-heading-1">Verify OTP</h1>
          {error && <p className="error-message">{error}</p>}
          <form className="otp-form" onSubmit={verifyOtp}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="submit" className="verify-otp-button">
              Verify OTP
            </button>
          </form>
        </>
      )}
      {/* Success Popup */}
      {isSignUpSuccess && (
        <div className="success-popup">
          <p>SignUp successful! You are being redirected...</p>
        </div>
      )}
    </div>
  );
};

export default SignupDonator;
