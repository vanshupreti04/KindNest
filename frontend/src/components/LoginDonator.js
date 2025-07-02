import React, { useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import './LoginDonator.css';

const LoginDonator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/donator/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);

        // Save donatorId to localStorage for future requests
        localStorage.setItem('donatorId', data.donatorId);

         // Redirect to the intended route or default to /donator-dashboard/profile
         const redirectTo = location.state?.redirectTo || '/donator-dashboard/profile';
         navigate(redirectTo); // Navigate based on state
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
        setError(errorData.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-donator-page">
      <h1 className="login-donator-heading">Donator Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="login-donator-form" onSubmit={handleLogin}>
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
        <button type="submit" className="confirm-login-button">
          Confirm Login
        </button>
      </form>
    </div>
  );
};

export default LoginDonator;
