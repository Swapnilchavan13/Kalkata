import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContex';
import '../Style/dashboard.css';

export const Dashboard = () => {
  const { logout } = useAuth(); // Get user and logout functions from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to the Dashboard</h1>
      </div>

      <div className="dashboard-links">
        <Link to="/merchantdata" className="dashboard-link">
          Merchant Data Collection
        </Link>
        <Link to="/merchantonbording" className="dashboard-link">
          Merchant Onboarding
        </Link>
        <Link to="/merchantcontent" className="dashboard-link">
          Merchant Content Creation
        </Link>
      </div>
      <br />
      <br />
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};
