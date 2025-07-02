import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginOrganisation.css'; // Add CSS for styling

const LoginOrganisation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      const response = await fetch('http://localhost:5000/api/organisation/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('organisationId', data.organisation._id); // Save organisation ID

        const redirectTo = location.state?.redirectTo || 'organisation-dashboard/items';
         navigate(redirectTo); 
        navigate('/organisation-dashboard/profile'); // Redirect to dashboard
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
  };
  
  return (
    <div className="login-organisation-page">
      <h1 className="login-heading">Login as Organisation</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleLogin}>
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
        <button type="submit" className="login-button-1">
          Confirm Login
        </button>
      </form>
    </div>
  );
};

export default LoginOrganisation;

