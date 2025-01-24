import React, { useEffect, useState } from 'react';

const Login = ({ onLogin }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8050/registrations');
      const data = await response.json();

      const user = data.find(
        (u) => u.mobileNumber === mobileNumber && u.loginPin === pin
      );

      if (user) {
        onLogin(user);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Error logging in. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
      <h2>Team Login for Content Upload</h2>
      <br />
      <br />
        <div>
          <label>Mobile Number</label>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>PIN</label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export const MerchantcontentByTeam = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [businesses, setBusinesses] = useState([]); // Store full business objects
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const city = {
    Mumbai: ['Juhu', 'Andheri (W)'],
    Kolkata: ['Park Street', 'Ballygunge'],
  };

  const [formData, setFormData] = useState({
    mainid: '',
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
    mobileNumber: user?.contactPerson || 'Office Team',
    offermade: false,
    offerposted: false
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('loggedInUser');
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetch('http://localhost:8050/getmerchants')
        .then((response) => response.json())
        .then((data) => {
          if (data.merchants) {
            setBusinesses(data.merchants); // Store full business objects
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    setFormData((prev) => ({ ...prev, mobileNumber: 'Office Team' }));
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setFormData((prev) => ({ ...prev, brand: searchTerm }));
    setFilteredBusinesses(
      businesses
        .filter((b) => b.businessName.toLowerCase().includes(searchTerm))
        .slice(0, 5)
    );
  };

  const handleBusinessSelect = (business) => {
    setFormData((prev) => ({
      ...prev,
      mainid: business._id, // Update mainid with the business _id
      brand: business.businessName, // Update brand with the business name
    }));
    setFilteredBusinesses([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'image1' || key === 'image2') {
        data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(
        'http://localhost:8050/addOfferData',
        {
          method: 'POST',
          body: data,
        }
      );

      if (response.ok) {
        alert('Offer details submitted successfully!');
        setFormData({
          mainid: '',
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
          mobileNumber: user.contactPerson,
          offermade: false,
          offerposted: false
        });
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div style={{ padding: '10px', maxWidth: '600px', margin: 'auto' }}>
      <img style={{ width: '100px' }} src="https://localite.services/w_logo.png" alt="" />
      <hr />
      <br />
      <div style={{display:'flex', justifyContent:'space-evenly'}}>

      <h4>Welcome, {user.contactPerson}</h4>
      <button style={{width:'80px', fontSize:'10px'}} onClick={handleLogout}>Logout</button>
      <br />
      </div>
      <br />

      <h3 style={{ textAlign: 'center' }}>Merchant Offer Details</h3>
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
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="brand">Search Business</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleSearch}
            placeholder="Search for a business"
            required
          />
          {filteredBusinesses.length > 0 && (
            <ul
              style={{
                maxHeight: '200px',
                overflowY: 'auto',
                border: '1px solid #ccc',
                padding: '0',
                marginTop: '5px',
              }}
            >
              {filteredBusinesses.map((business, index) => (
                <li
                  key={index}
                  style={{
                    padding: '5px',
                    cursor: 'pointer',
                    backgroundColor: '#f9f9f9',
                    borderBottom: '1px solid #ddd',
                  }}
                  onClick={() => handleBusinessSelect(business)}
                >
                  {business.businessName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter offer title"
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
            placeholder="Enter offer headline"
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
            placeholder="Enter offer description"
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
            placeholder="Enter excerpt description"
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
            placeholder="Enter units"
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
            placeholder="Enter price"
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
            placeholder="Enter discounted percentage"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image1">Upload Image 1</label>
          <input
            type="file"
            id="image1"
            name="image1"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          {formData.image1 && (
            <img
              src={URL.createObjectURL(formData.image1)}
              alt="Preview 1"
              style={{ maxWidth: '100px', marginTop: '10px' }}
            />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="image2">Upload Image 2</label>
          <input
            type="file"
            id="image2"
            name="image2"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          {formData.image2 && (
            <img
              src={URL.createObjectURL(formData.image2)}
              alt="Preview 2"
              style={{ maxWidth: '100px', marginTop: '10px' }}
            />
          )}
        </div>

        <button
          type="submit"
          style={{ marginTop: '10px' }}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};
