import React, { useState } from 'react';

export const Merchantcontent = () => {
  const [businesses] = useState([
    'Haute Dog Pet Salon & Boutique Store',
    'Paws and Relax',
    'The Pet Spa',
  ]);
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
    mobileNumber: localStorage.getItem('mobileNumber') || '', // Retrieve mobile number
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
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
      mobileNumber: localStorage.getItem('mobileNumber') || '', // Retrieve mobile number
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Merchant Offer Details</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" style={{ marginTop: '10px' }}>
          Submit
        </button>
      </form>
    </div>
  );
};
