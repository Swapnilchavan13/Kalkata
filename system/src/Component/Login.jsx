import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContex';
import { Link, useNavigate } from 'react-router-dom';
// import '../styles/login.css';

export const Login = () => {
  const [merchants, setMerchants] = useState([]);
  const [mobileNumber, setMobileNumber] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useAuth(); // Include user from useAuth
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await fetch('https://backend.climescore.com/getisn-registration');
        const data = await response.json();
        setMerchants(data);
      } catch (error) {
        console.error('Error fetching merchants:', error);
      }
    };

    fetchMerchants();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Find the user by matching the mobile number and login pin
    const user = merchants.find(
      (merchant) => merchant.mobileNumber === mobileNumber && merchant.loginPin === loginPin
    );

    if (user) {
      login(user); // Call login from AuthContext with the full user object
      navigate('/dashboard'); // Redirect to the dashboard
    } else {
      setError('Invalid mobile number or PIN');
    }
  };

  return (
    <div className="login-container" style={{ 
      backgroundImage: "url('/bg2.png')", 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat' 
    }}>
      <div id='centreimgdiv'>
        <img className='loginpinimg' src="Localite_icon.png" alt="" />
        <br />
      </div>
      <p className='lheading'>Login Page</p>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <input
            type="tel"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder='📞 Enter Mobile Number'
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="loginPin"
            value={loginPin}
            onChange={(e) => setLoginPin(e.target.value)}
            placeholder='🔐 Enter Login Pin'
            required
          />
        </div>
        <div style={{display:'flex', justifyContent:'space-between'}}>

        {error && <p className="error-message">{error}</p>}
        <p style={{color: 'red'}}>Forgot password?</p>
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
