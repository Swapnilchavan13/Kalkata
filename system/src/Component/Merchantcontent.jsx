import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Merchantcontent = () => {
  const navigate = useNavigate();
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const city = {
    "Mumbai": ['Juhu', 'Andheri (W)'],
    "Kolkata": ['Park Street', 'Ballygunge'],
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
    mobileNumber: localStorage.getItem('mobileNumber') || '',
    offermade: false,
    offerposted: false,
  });

  useEffect(() => {
    const mobileNumber = localStorage.getItem('mobileNumber');

    if (mobileNumber) {
      fetch(`https://fieldteam.localite.services/api/getmerchants/${mobileNumber}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.merchants) {
            setMerchants(data.merchants); // Store the full merchant objects
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
    } else {
      console.error('Mobile number not found in localStorage');
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (name === 'brand') {
        // Find the merchant by business name and set its _id to mainid
        const selectedMerchant = merchants.find((merchant) => merchant.businessName === value);
        updatedData.mainid = selectedMerchant ? selectedMerchant.mainid : '';
      }

      return updatedData;
    });
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
          mobileNumber: localStorage.getItem('mobileNumber') || '',
          offermade: false,
          offerposted: false,
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
          <label>Select City:</label>
          <select name="city" value={formData.city} onChange={handleChange} required>
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
            disabled={!formData.city}
          >
            <option value="">Select Area</option>
            {formData.city &&
              city[formData.city].map((area, index) => (
                <option key={index} value={area}>
                  {area}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="brand">Select Brand</label>
          <select
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          >
            <option value="">Select a Business</option>
            {merchants.length > 0 ? (
              merchants.map((merchant) => (
                <option key={merchant.mainid} value={merchant.businessName}>
                  {merchant.businessName}
                </option>
              ))
            ) : (
              <option value="">No businesses available</option>
            )}
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
          disabled={submitting} // Disable button when submitting
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};
