import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Contentbymerchant = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [businesses, setBusinesses] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const city = {
    "Mumbai" : ['Juhu', 'Andheri (W)'],
    "Kolkata" : ['Park Street', 'Ballygunge']
  }

  const [loginData, setLoginData] = useState({
    contactPhoneNumber: '',
    password: '',
  });
  const [formData, setFormData] = useState({
    city: '',
    area: '',
    brand: '',
    title: '',
    headline: '',
    description: '',
    excerptDescription: '',
    units: '',
    price: '',
    discountedPercentage: '',
    image1: null,
    image2: null,
    mobileNumber: 'Self',
    offermade: false,
    offerposted: false
  });

  useEffect(() => {
    // Check if the user is already logged in from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      setLoggedIn(true);
      fetchMerchantData(); // Fetch merchant data without relying on mobileNumber
    }
  }, []);

  const fetchMerchantData = async (contactPhoneNumber) => {
    if (!contactPhoneNumber) return;
    setLoading(true);
    try {
      const response = await fetch(`https://fieldteam.localite.services/api/getmerchantsself/${contactPhoneNumber}`);
      const data = await response.json();
      if (data.merchants) {
        const businessNames = data.merchants.map((merchant) => merchant.businessName);
        setBusinesses(businessNames);
        if (businessNames.length > 0) {
          setSelectedBusiness(businessNames[0]); // Set the first business as default
        }
      } else {
        console.error('No merchants found');
        setBusinesses([]);
        setSelectedBusiness('');
      }
    } catch (error) {
      console.error('Error fetching merchant data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://fieldteam.localite.services/api/getmerchants');
      const data = await response.json();
      const merchant = data.merchants.find(
        (m) =>
          m.contactPhoneNumber === loginData.contactPhoneNumber &&
          m.password === loginData.password
      );

      if (merchant) {
        setFormData((prev) => ({ ...prev, mobileNumber: merchant.contactPhoneNumber }));
        fetchMerchantData(merchant.contactPhoneNumber);
        localStorage.setItem('isLoggedIn', 'true'); // Save login state in localStorage
        setLoggedIn(true);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  };

  const handleLogout = () => {
    // Clear the logged-in state and reset data
    localStorage.removeItem('isLoggedIn'); // Remove login state from localStorage
    setLoggedIn(false);
    setBusinesses([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch('https://fieldteam.localite.services/api/addOfferData', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert('Offer details submitted successfully!');
        setFormData({
          city: '',
          area: '',
          brand: '',
          title: '',
          headline: '',
          description: '',
          excerptDescription: '',
          units: '',
          price: '',
          discountedPercentage: '',
          image1: null,
          image2: null,
          mobileNumber: "Self",
          offermade: false,
          offerposted: false
        });
        navigate('/dashboard');
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!loggedIn) {
    return (
      <div style={{ padding: '10px', maxWidth: '400px', margin: 'auto' }}>
        <h3>Merchant Login</h3>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="contactPhoneNumber">Phone Number</label>
            <input
              type="text"
              id="contactPhoneNumber"
              name="contactPhoneNumber"
              value={loginData.contactPhoneNumber}
              onChange={handleLoginChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            Login
          </button>
        </form>
        
      </div>
    );
  }

  return (
    <div style={{ padding: '10px', maxWidth: '600px', margin: 'auto' }}>
      <img style={{ width: '100px' }} src="https://localite.services/w_logo.png" alt="" />
      <hr />
      <h3 style={{ textAlign: 'center' }}>Merchant Offer Details</h3>
      <form onSubmit={handleSubmit}>
      <div>
        <label>Select City:</label>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        >
          <option value="">Select City</option>
          {Object.keys(city).map((cityName) => (
            <option key={cityName} value={cityName}>
              {cityName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Select Area:</label>
        <select
          name="area"
          value={formData.area}
          onChange={handleChange}
          required
          disabled={!formData.city} // Disable area dropdown if no city is selected
        >
          <option value="">Select Area</option>
          {formData.city && city[formData.city].map((area, index) => (
            <option key={index} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

        <div className="form-group">
          <label htmlFor="brand">Select Brand</label>
          <select id="brand" name="brand" value={formData.brand} onChange={handleChange} required>
            <option value="">Select a Business</option>
            {businesses.map((business, index) => (
              <option key={index} value={business}>
                {business}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="headline">Headline</label>
          <input
            type="text"
            id="headline"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="excerptDescription">Excerpt Description</label>
          <textarea
            id="excerptDescription"
            name="excerptDescription"
            value={formData.excerptDescription}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="units">Units</label>
          <input
            type="number"
            id="units"
            name="units"
            value={formData.units}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="discountedPercentage">Discounted Percentage</label>
          <input
            type="number"
            id="discountedPercentage"
            name="discountedPercentage"
            value={formData.discountedPercentage}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image1">Offer Image 1</label>
          <input type="file" id="image1" name="image1" onChange={handleImageChange} required />
          {formData.image1 && (
            <img src={URL.createObjectURL(formData.image1)} alt="Preview 1" style={{ maxWidth: '100px', marginTop: '10px' }} />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="image2">Offer Image 2</label>
          <input type="file" id="image2" name="image2" onChange={handleImageChange} required />
          {formData.image2 && (
            <img src={URL.createObjectURL(formData.image2)} alt="Preview 2" style={{ maxWidth: '100px', marginTop: '10px' }} />
          )}
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      <button className='logoutbtn' onClick={handleLogout}>Logout</button>
    </div>
  );
};

