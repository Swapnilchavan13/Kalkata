import React, { useState, useEffect } from 'react';
import '../Style/editmerchant.css';

export const Editmerchant = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [merchants, setMerchants] = useState([]);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const mobileNumber = localStorage.getItem('mobileNumber');

  useEffect(() => {
    fetchMerchants();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchMerchants = async () => {
    try {
      const response = await fetch(
        `https://fieldteam.localite.services/api/getmerchantsdata/${mobileNumber}`
      );
      const data = await response.json();
      setMerchants(data);
    } catch (error) {
      console.error('Error fetching merchants:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `https://fieldteam.localite.services/api/getmerchantsdata/${mobileNumber}`
      );
      const data = await response.json();
  
      // Filter merchants with "Contact again" status and extract unique categories
      const uniqueCategories = [
        ...new Set(
          data
            .filter((merchant) => merchant.contactStatus === "Contact again")
            .map((merchant) => merchant.category)
        ),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectMerchant = (merchant) => {
    setSelectedMerchant(merchant);
    setFormData(merchant);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedData = {
        ...formData,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      const response = await fetch(
        `https://fieldteam.localite.services/api/editmerchantdata/${formData._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        alert('Details updated successfully');
        fetchMerchants();
        setSelectedMerchant(null);
      } else {
        console.error('Failed to update merchant details');
      }
    } catch (error) {
      console.error('Error updating merchant:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter merchants based on category, search query, and contact status
  const filteredMerchants = merchants.filter(
    (merchant) =>
      (selectedCategory === '' || merchant.category === selectedCategory) &&
      merchant.contactStatus === 'Contact again' &&
      merchant.nameOfBusiness.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="edit-merchant-container">
      <h1 className="edit-merchant-title">Update Merchant</h1>
      <div className="filter-container">
        <select
          className="category-dropdown"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="edit-merchant-search"
          placeholder="Search by business name"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <ul className="merchant-list">
        {filteredMerchants.map((merchant) => (
          <li
            key={merchant._id}
            className="merchant-item"
            onClick={() => handleSelectMerchant(merchant)}
          >
            {merchant.nameOfBusiness}
          </li>
        ))}
      </ul>
      {selectedMerchant && (
        <div className="merchant-details">
          <h2 className="merchant-details-title">
            Edit Details for {selectedMerchant.nameOfBusiness}
          </h2>
          <div className="form-group">
            <label>Decision Maker Available:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="decisionMakerAvailable"
                  value="Yes"
                  checked={formData.decisionMakerAvailable === 'Yes'}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="decisionMakerAvailable"
                  value="No"
                  checked={formData.decisionMakerAvailable === 'No'}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>
          <hr />

          <div className="form-group">
            <label>Contact Status:</label>
            <select
              className="form-select"
              name="contactStatus"
              value={formData.contactStatus}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Contact again">Contact again</option>
              <option value="Onboarded">Onboarded</option>
              <option value="Not interested">Not interested</option>
            </select>
          </div>

          {formData.contactStatus === 'Contact again' && (
            <div className="form-group">
              <label>Next Steps:</label>
              <select
                className="form-select"
                name="additionalOption"
                value={formData.additionalOption}
                onChange={handleChange}
                required
              >
                <option value="">Select Option</option>
                <option value="Send details digitally">
                  Send details digitally
                </option>
                <option value="Physically visit again">
                  Physically visit again
                </option>
                <option value="Other">Other</option>
              </select>
              {formData.additionalOption === 'Physically visit again' && (
                <div className="form-group">
                  <label>Date and Time of Visit:</label>
                  <input
                    type="datetime-local"
                    className="form-input"
                    name="visitDateTime"
                    value={formData.visitDateTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
            </div>
          )}
          
          {formData.contactStatus === 'Onboarded' && (
            <div style={{display:"flex",gap:"50px", width:'100%'}} className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="registrationFormFilled"
                  checked={formData.registrationFormFilled}
                  onChange={handleChange}
                />
                Registration form filled
              </label>
              <label>
                <input
                  type="checkbox"
                  name="kycDone"
                  checked={formData.kycDone}
                  onChange={handleChange}
                />
                KYC Done
              </label>
            </div>
          )}
          <hr />
          {formData.contactStatus === 'Not interested' && (
            <div className="form-group">
              <label>Reason:</label>
              <select
                className="form-select"
                name="additionalOption"
                value={formData.additionalOption}
                onChange={handleChange}
                required
              >
                <option value="">Select Reason</option>
                <option value="They are dependent on your own marketing & social media team.">
                  They are dependent on your own marketing & social media team.
                </option>
                <option value="They aren't dependent on your locality-based businesses.">
                  They aren't dependent on your locality-based businesses.
                </option>
                <option value="Not interested in online-based businesses.">
                  Not interested in online-based businesses.
                </option>
              </select>
            </div>
          )}
          <button
            className="save-button"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      )}
    </div>
  );
};
