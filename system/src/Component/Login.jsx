import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContex';
import { useNavigate } from 'react-router-dom';
import '../Style/login.css'

export const Login = () => {
  const [merchants, setMerchants] = useState([]);
  const [mobileNumber, setMobileNumber] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [ setError] = useState('');
  const { login } = useAuth(); // Include login from useAuth
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate('/dashboard');
    }
  }, [navigate]);

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
      localStorage.setItem('mobileNumber', mobileNumber); // Save mobile number in localStorage

      login(user); // Pass the full user object to login
      navigate('/dashboard'); // Redirect to the dashboard
    } else {
      setError('Invalid mobile number or PIN');
    }
  };

  return (
    <div className="login-container" style={{ 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat' 
    }}>
      <div id='centreimgdiv'>
        <img id='loginpinimg' src="https://localite.services/w_logo.png" alt="" />
        <hr />
      </div>
      <h2 id='lheading'>Login</h2>
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
        </div>
        
        <button id='loginbtn' type="submit">Login</button>
      </form>
    </div>
  );
};
