import React, { useState, useEffect } from 'react';

export const Merchantmarketingform = () => {
  const [businesses, setBusinesses] = useState([]); // Store list of businesses
  const [users, setUsers] = useState([]);

  const [selectedMerchant, setSelectedMerchant] = useState({
    mainid: '',  // Store the selected merchant's ID
    businessName: '' // Store the selected merchant's name
  });
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    mainid: '', // Store the main id
    businessName: '', // Store the business name
    googleMapLink: '',
    googleReviewScore: '',
    instaPageLink: '',
    instaPosts: '',
    instaFollowers: '',
    instaScore: '',
    youtubePageLink: '',
    youtubeVideos: '',
    youtubeViews: '',
    whatsappBusiness: 'NO',
    whatsappStore: 'NO',
    whatsappGroup: 'NO',
    anyPamplate: 'NO',
    
    interested: 'NO',
    catalaugefilled: 'NO',
    contactPerson: '',


    shopImage1: null,
    shopImage2: null,
    shopImage3: null,
    customerBase: '',
    turnover: '',
    realEstatePhotos: '',
    mobileNumber: localStorage.getItem('mobileNumber') || '', // Retrieve mobile number

  });

  // Fetch merchant data
  useEffect(() => {
    fetch('https://fieldteam.localite.services/api/getmerchants')
      .then((response) => response.json())
      .then((data) => {
        if (data.merchants) {
          setBusinesses(data.merchants); // Store full business objects
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []); // Empty dependency array to fetch merchants once

  useEffect(() => {
  fetch('https://fieldteam.localite.services/api/registrations')
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        setUsers(data);
      }
    })
    .catch(console.error);
}, []);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  const handleMerchantSelect = (business) => {
    setSelectedMerchant({
      mainid: business.mainid, // Store the main id
      businessName: business.businessName // Store the business name
    });
    setSearchQuery(business.businessName); // Set the selected business name in the search field
    // Update formData with the selected merchant
    setFormData((prevData) => ({
      ...prevData,
      mainid: business.mainid,  // Update the form with the selected merchant's mainid
      businessName: business.businessName // Update the form with the selected business name
    }));
  };

  const filteredBusinesses = businesses.filter((business) =>
    business.businessName.toLowerCase().includes(searchQuery.toLowerCase())
  ); // Filter merchants based on search query

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      
      // Update formData directly
      setFormData((prevData) => ({
        ...prevData,
        [name]: file // Directly storing the file object (will be handled during submission)
      }));
    }
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Use the formData from state
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('mainid', formData.mainid);
    formDataToSubmit.append('businessName', formData.businessName);
    formDataToSubmit.append('googleMapLink', formData.googleMapLink);
    formDataToSubmit.append('googleReviewScore', formData.googleReviewScore);
    formDataToSubmit.append('instaPageLink', formData.instaPageLink);
    formDataToSubmit.append('instaPosts', formData.instaPosts);
    formDataToSubmit.append('instaFollowers', formData.instaFollowers);
    formDataToSubmit.append('instaScore', formData.instaScore);
    formDataToSubmit.append('youtubePageLink', formData.youtubePageLink);
    formDataToSubmit.append('youtubeVideos', formData.youtubeVideos);
    formDataToSubmit.append('youtubeViews', formData.youtubeViews);
    formDataToSubmit.append('whatsappBusiness', formData.whatsappBusiness);
    formDataToSubmit.append('whatsappStore', formData.whatsappStore);
    formDataToSubmit.append('whatsappGroup', formData.whatsappGroup);
    formDataToSubmit.append('anyPamplate', formData.anyPamplate);

    formDataToSubmit.append('interested', formData.interested);
    formDataToSubmit.append('catalaugefilled', formData.catalaugefilled);
    formDataToSubmit.append('contactPerson', formData.contactPerson);


    formDataToSubmit.append('customerBase', formData.customerBase);
    formDataToSubmit.append('turnover', formData.turnover);
    formDataToSubmit.append('realEstatePhotos', formData.realEstatePhotos);
    formDataToSubmit.append('mobileNumber', localStorage.getItem('mobileNumber') || ''); // Retrieve mobile number
  
    // Append images to FormData if available
    if (formData.shopImage1) {
      formDataToSubmit.append('shopImage1', formData.shopImage1);
    }
    if (formData.shopImage2) {
      formDataToSubmit.append('shopImage2', formData.shopImage2);
    }
    if (formData.shopImage3) {
      formDataToSubmit.append('shopImage3', formData.shopImage3);
    }
  
    fetch('https://fieldteam.localite.services/api/addmarketingdata', {
      method: 'POST',
      body: formDataToSubmit,
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Marketing data saved successfully!');
        } else {
          alert('Error saving marketing data');
        }
      })
      .catch(console.error);
  };
  
  
  

  if (loading) return <div>Loading merchants...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
  <label>Select User (Contact Person):</label>
  <select
    name="contactPerson"
    value={formData.contactPerson}
    onChange={handleChange}
  >
    <option value="">-- Select Contact Person --</option>
    {users.map((user) => (
      <option key={user._id} value={user.contactPerson}>
        {user.contactPerson}
      </option>
    ))}
  </select>
</div>


      <div>
        <label>Search Merchant by Business Name:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Enter business name"
        />
        {searchQuery && (
          <div style={{ border: '1px solid #ccc', maxHeight: '150px', overflowY: 'auto', position: 'absolute', backgroundColor: 'white' }}>
            {filteredBusinesses.map((business) => (
              <div
                key={business._id}
                onClick={() => handleMerchantSelect(business)}
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #ddd',
                }}
              >
                {business.businessName}
              </div>
            ))}
          </div>
        )}
      </div>
      <br />
      <br />

      {/* Selected Merchant Display */}
      {selectedMerchant.name && (
        <div>
          <h2>
            <strong>Selected Merchant:</strong> {selectedMerchant.name}
          </h2>
        </div>
      )}
    <br />     
      <div>
        <label>Google Map Link:</label>
        <input
          type="text"
          name="googleMapLink"
          value={formData.googleMapLink}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Google Review Score:</label>
        <input
          type="number"
          name="googleReviewScore"
          value={formData.googleReviewScore}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Instagram Page Link:</label>
        <input
          type="text"
          name="instaPageLink"
          value={formData.instaPageLink}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>No. of Posts on Instagram:</label>
        <input
          type="number"
          name="instaPosts"
          value={formData.instaPosts}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>No. of Followers on Instagram:</label>
        <input
          type="number"
          name="instaFollowers"
          value={formData.instaFollowers}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Instagram Score (1-100):</label>
        <input
          type="number"
          name="instaScore"
          value={formData.instaScore}
          onChange={handleChange}
          min="1"
          max="100"
        />
      </div>
      <div>
        <label>YouTube Page Link:</label>
        <input
          type="text"
          name="youtubePageLink"
          value={formData.youtubePageLink}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>No. of Videos on YouTube:</label>
        <input
          type="number"
          name="youtubeVideos"
          value={formData.youtubeVideos}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>No. of Views on YouTube:</label>
        <input
          type="number"
          name="youtubeViews"
          value={formData.youtubeViews}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>WhatsApp Business (YES/NO):</label>
        <select
          name="whatsappBusiness"
          value={formData.whatsappBusiness}
          onChange={handleChange}
        >
          <option value="YES">YES</option>
          <option value="NO">NO</option>
        </select>
      </div>
      <div>
        <label>WhatsApp Store (YES/NO):</label>
        <select
          name="whatsappStore"
          value={formData.whatsappStore}
          onChange={handleChange}
        >
          <option value="YES">YES</option>
          <option value="NO">NO</option>
        </select>
      </div>
      <div>
        <label>WhatsApp Group (YES/NO):</label>
        <select
          name="whatsappGroup"
          value={formData.whatsappGroup}
          onChange={handleChange}
        >
          <option value="YES">YES</option>
          <option value="NO">NO</option>
        </select>
      </div>
      <div>
        <label>Any Pamplate (YES/NO):</label>
        <select
          name="anyPamplate"
          value={formData.anyPamplate}
          onChange={handleChange}
        >
          <option value="YES">YES</option>
          <option value="NO">NO</option>
        </select>
      </div>
       <div>
        <label>Is the merchant interested in making a payment? (Yes/No)::</label>
        <select
          name="interested"
          value={formData.interested}
          onChange={handleChange}
        >
          <option value="YES">YES</option>
          <option value="NO">NO</option>
        </select>
      </div>
      <div>
        <label>Has the merchant filled the catalogue? (Yes/No):</label>
        <select
          name="catalaugefilled"
          value={formData.catalaugefilled}
          onChange={handleChange}
        >
          <option value="YES">YES</option>
          <option value="NO">NO</option>
        </select>
      </div>
      <div>
        <label>Upload Merchant Shop Image 1:</label>
        <input
          type="file"
          name="shopImage1"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      <div>
        <label>Upload Merchant Shop Image 2:</label>
        <input
          type="file"
          name="shopImage2"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      <div>
        <label>Upload Merchant Shop Image 3:</label>
        <input
          type="file"
          name="shopImage3"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      <div>
        <label>Merchant Customer Base:</label>
        <input
          type="text"
          name="customerBase"
          value={formData.customerBase}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Merchant Turnover (Lacs):</label>
        <input
          type="number"
          name="turnover"
          value={formData.turnover}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Merchant Real Estate for Visual Merchandising & Store Photos:</label>
        <input
          type="text"
          name="realEstatePhotos"
          value={formData.realEstatePhotos}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
