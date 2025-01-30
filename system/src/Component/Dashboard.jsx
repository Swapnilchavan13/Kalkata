import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContex';
import '../Style/dashboard.css';

export const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [location, setLocation] = useState(null);
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    const fetchMerchantData = async () => {
      const mobileNumber = localStorage.getItem('mobileNumber');
      if (!mobileNumber) return;

      try {
        const response = await fetch(`https://fieldteam.localite.services/api/getmerchantsdata/${mobileNumber}`);
        const data = await response.json();

        const today = new Date().toISOString().split('T')[0];
        const sortedNotifications = data
          .map(item => ({
            ...item,
            visitDate: new Date(item.visitDateTime).toISOString().split('T')[0],
            visitTime: new Date(item.visitDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }))
          .sort((a, b) => new Date(a.visitDateTime) - new Date(b.visitDateTime));

        const hasTodayVisits = sortedNotifications.some(item => item.visitDate === today);
        setHasNewNotifications(hasTodayVisits);
        setNotifications(sortedNotifications);
      } catch (error) {
        console.error('Error fetching merchant data:', error);
      }
    };

    fetchMerchantData();
  }, []);

  useEffect(() => {
    if (window.Worker) {
      const locationWorker = new Worker('locationWorker.js');

      locationWorker.postMessage('startTracking');

      locationWorker.onmessage = (event) => {
        const { latitude, longitude } = event.data;
        setLocation({ lat: latitude, lng: longitude });
        updateLocationOnServer(latitude, longitude);
      };

      setWorker(locationWorker);
    } else {
      console.error('Web Workers are not supported in this browser.');
    }

    return () => {
      if (worker) worker.terminate();
    };
  }, []);

  const updateLocationOnServer = async (latitude, longitude) => {
    const mobileNumber = localStorage.getItem('mobileNumber');
    if (!mobileNumber) return;

    try {
      const response = await fetch(`https://fieldteam.localite.services/api/update-location/${mobileNumber}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Location updated successfully', data);
      } else {
        console.error('Failed to update location', data);
      }
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (hasNewNotifications) setHasNewNotifications(false);
  };

  const today = new Date().toISOString().split('T')[0];

  const redirectToGoogleMaps = () => {
    if (location) {
      const googleMapsUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
      window.open(googleMapsUrl, '_blank');
    } else {
      alert('Location not available');
    }
  };

  return (
    <div className="dashboard-container">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <img style={{ width: '400px' }} id="loginpinimg" src="https://localite.services/w_logo.png" alt="" />
        <div className="notification-icon" onClick={toggleNotifications}>
          <span className='bell' role="img" aria-label="bell">🔔</span>
          {hasNewNotifications && <span className="notification-count">!</span>}
        </div>
      </div>

      <hr />
      <div className="button-container">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="dashboard-header">
        <h1>Which Merchant Data Would you Like to Enter?</h1>
      </div>
      <div className="dashboard-links">
        <Link to="/editmerchant" className="dashboard-link">Existing Merchant Data</Link>
        <Link to="/merchantdata" className="dashboard-link">Merchant Data Collection</Link>
        <Link to="/merchantonboarding" className="dashboard-link">Merchant Onboarding</Link>
        <Link to="/merchantcontent" className="dashboard-link">Merchant Content Creation</Link>
      </div>

      {/* Location Display */}
      <div className="location-container">
        {location ? (
          <>
            <p>Live Location: Latitude {location.lat}, Longitude {location.lng}</p>
            <button onClick={redirectToGoogleMaps}>View on Google Maps</button>
          </>
        ) : (
          <p>Loading location...</p>
        )}
      </div>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="notifications-dropdown">
          <h3>Today's Visits</h3>
          {notifications.filter(item => item.visitDate === today).length > 0 ? (
            notifications.filter(item => item.visitDate === today).map(item => (
              <div key={item._id} className="notification-item">
                <strong>{item.nameOfBusiness}</strong>
                <p>{item.address}</p>
                <p>Time: {item.visitTime}</p>
              </div>
            ))
          ) : (
            <p>No visits for today.</p>
          )}

          <h3>Upcoming Visits</h3>
          {notifications.filter(item => item.visitDate > today).length > 0 ? (
            notifications.filter(item => item.visitDate > today).map(item => (
              <div key={item._id} className="notification-item">
                <strong>{item.nameOfBusiness}</strong>
                <p>{item.address}</p>
                <p>Date: {item.visitDate}</p>
                <p>Time: {item.visitTime}</p>
              </div>
            ))
          ) : (
            <p>No upcoming visits.</p>
          )}
        </div>
      )}
    </div>
  );
};
