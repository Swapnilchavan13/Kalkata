import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MerchantcontentByTeam = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
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
    mobileNumber: 'Office Team',
  });

  useEffect(() => {
    // Fetch merchants data
    fetch('https://fieldteam.localite.services/api/getmerchants')
      .then((response) => response.json())
      .then((data) => {
        if (data.merchants) {
          const businessNames = data.merchants.map((merchant) => merchant.businessName);
          setBusinesses(businessNames);
          setFilteredBusinesses(businessNames.slice(0, 5)); // Show first 5 businesses initially
        } else {
          console.error('No merchants found');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setFormData((prevData) => ({
      ...prevData,
      brand: searchTerm,
    }));

    // Filter businesses based on the search term
    const filtered = businesses.filter((business) =>
      business.toLowerCase().includes(searchTerm)
    );
    setFilteredBusinesses(filtered.slice(0, 5)); // Limit to 5 results
  };

  const handleBusinessSelect = (business) => {
    setFormData((prevData) => ({
      ...prevData,
      brand: business,
    }));
    setFilteredBusinesses([]); // Hide search results after selection
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
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
      const response = await fetch('https://fieldteam.localite.services/api/addOfferData', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert('Offer details submitted successfully!');
        setFormData({
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
          mobileNumber: 'Office Team',
        });

        // navigate('/dashboard');
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '10px', maxWidth: '600px', margin: 'auto' }}>
      <img style={{ width: '100px' }} src="https://localite.services/w_logo.png" alt="" />
      <hr />
      <br />
      <h3 style={{ textAlign: 'center' }}>Merchant Offer Details</h3>
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
            <ul style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '0', marginTop: '5px' }}>
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
                  {business}
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
