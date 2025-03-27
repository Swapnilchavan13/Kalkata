import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from "react-signature-canvas";

export const Merchantonboarding = () => {
  const navigate = useNavigate();

  const categories = {
    'FOOD & BEVERAGES': [
      'Fine Dining', 'Casual Dining Restaurants', 'Fast Foods CAFES & Tea Houses', 'Ethnic Cuisines', 'Bakeries & Cake Shops', 
      'Restro- Bars & Nightlife (Pubs/Clubs)', 'Sweets Store', 'Milk Dairy Store', 'Icecream Parlour', 'Health/ Nutrition food stores', 
      'Private chefs', 'Pop- Up Eateries Food Truck', 'Event Catering Service', 'Home kitchen services', 'Wine Shops', 
      'Organic Food Stores', 'Cloud Kitchen', 'Vegetable Vendors/ Farmers market', 'Meat / Fish / Chicken'
    ],
    'PROFESSIONAL SERVICES': [
      'Law Firms', 'Notaries', 'Real Estate Agency', 'Real Estate Projects', 'Marketing Agency', 
      'Financial Services', 'Technology Services', 'Consulting Services', 'Accounting services', 'Graphic Designer', 
      'Website Designer', 'Photographer/ Videographer', 'Interior Designer', 'Architechture Firm', 'Lawyer'
    ],
    'ENTERTAINMENT & LEISURE': [
      'Movie Theaters', 'Drama Theaters/ Playhouse', 'Sport Clubs & Academy', 'Recreation Clubs', 'Event Planners', 
      'Venue Rental', 'Dancing Workshops', 'Singing Workshops', 'Acting Classes', 'Workshops & Classes', 
      'Gaming Zone', 'Playzones', 'Amusement parks/ Adventures', 'Bands/ Djs'
    ],
    'HEALTHCARE & WELLNESS': [
      'General Clinics', 'Hospital & Medical Centres', 'Maternity Centre', 'Gynecologist Clinics', 'Diabtologist and endocrinologist', 
      'Gastro Specialist', 'Healthcare Agency', 'Diagnostics Center', 'Ayurvedic Clinics', 'Ayurvedic Medicine', 
      'Specialized Doctors/ Treatments', 'Dermatologist', 'Cardiologist', 'Dentists', 'Orthopedic', 
      'Physiotherapist', 'Pilllates', 'Mental Health Service', 'Psychiatrists', 'Psychologist', 
      'Chiroprators', 'Spiritual Health Expert', 'Weight Loss Clinics', 'Acupuncturists', 'Naturopathy', 
      'Pharmacies & Medical Stores', 'Homeopathy', 'Pediatrician', 'Sleep Clinic', 'Allergy Clinics', 
      'Dietician', 'Pet Clinics & Grooming services'
    ],
    'AUTOMOTIVE & TRANSPORT': [
      'Used Car Dealership', 'Car Showrooms', 'Motorcycle Dealership', 'Motorcycle Showrooms', 'Automobile Servicing center', 
      'Cars Upholstery shops', 'Auto Spare Parts & Accesories', 'Cab Services', 'Cars Rental', 'Bus/ Tempo Rental', 
      'Bicycle Shops', 'Electric Vehicle Charging Station', 'Tours & Travel Agency'
    ],
    'EDUCATION & LEARNING': [
      'Private Schools', 'Public Schools', 'Preschool', 'Supplementary (Tutoring Service)', 'Special Children School', 
      'Day Care Centre', 'Colleges', 'Universities', 'Vocational Training', 'Career Training Programs', 
      'Continuing Education', 'Book Stores', 'Language Classes (English/ Foreign)', 'Music Classes', 'Dance Classes', 
      'Cooking classes', 'Art Classes', 'Pottery Class', 'Wood Working Classes', 'Handwriting Classes', 
      'Exam Prepration', 'Virtual Schools', 'Home tutors', 'Fashion Design School', 'Sporting / Gym goods store'
    ],
    'RETAIL & SHOPPING': [
      'Clothing (Men)', 'Clothing Women', 'Women Sarees & Ghagras', 'Boutiques', 'Kids Clothing & Products', 
      'Electronic Stores', 'Mobile Phones Store', 'Mobile Phone Accessories Stores', 'Office Goods', 'Printing services', 
      'Florist', 'Gift shop', 'Toy Store', 'Speciality Store', 'Grocery stores/ Supermarkets', 'Jewellery Stores', 
      'Uniform & Shoes Shop', 'Thrift Shop', 'Pet Food Supply Store', 'Art & Craft Supplies', 'Stationary Store', 
      'Clothing Accessories', 'Bags', 'Watch Stores', 'Footware Stores', 'Opticians', 'Sustainable Goods', 
      'Organic Clothing', 'Music Instuments store', 'Cosmetic Stores'
    ],
    'HOME & MAINTAINANCE': [
      'Hardware store', 'Home Goods', 'Home Decor/ Interior', 'Painting & Ceiling Services', 'Decorators', 
      'Kitchen appliance & supply store', 'Plant Nursery', 'Gardening & landscaping', 'Swimming pool contractor', 
      'Plumbling Services and Store', 'Electronic Repair Shops', 'Electricians / Electrical supply store', 
      'HVAC Technicians', 'Home Cleaning Services', 'Commercial Cleaning', 'Laundry Services', 
      'Pest Control (Exterminatiors)', 'Smart Home installations(Home Automation)', 'Sewing Supplies'
    ],
    'PERSONAL CARE': [
      'Hair & Beauty Salons', 'Nail Salon', 'Day Spas', 'Parlours Massage', 'Makeup Artist', 
      'Astheticians', 'Personal Trainner', 'GYMs', 'Yoga Studios', 'Fitness Center', 
      'Holistic Health Services', 'Tattoo'
    ],
    'MISCELLANEOUS': [
      'Co-Working Space', 'Courier Services', 'Talior', 'Pandits', 'Waste Management Services', 
      'Utilities Water', 'Gas', 'Recycling Center', 'Youth Program', 'Security Guard Services', 
      'Securtity Services (Home Security Systems)', 'Moving & Storage Company'
    ],
    'ACCOMODATION': [
      'Hotels', 'Lounges', 'Hostels', 'Rentals/ PGs', 'Community Centers'
    ],
    'COMMUNITY & GOVERNMENT': [
      'Libraries', 'Post office', 'Municipal offices', 'Non-Profit Charities', 'Religious Organisation', 
      'Waste Management Services', 'Recycling Center', 'Youth Program'
    ]
  };
    
  
  const [formData, setFormData] = useState({
    mainid:'',
    city: '',
    area: '',
    personName: '',
    lastName: '',
    password: '',
    profileImage: null,
    businessName: '',
    businessType: 'NA',
    businessAddress: '',
    websiteUrl: '',
    operationHours: '',
    yearsOfBusiness: '',
    numberOfEmployees: '',
    productDescription: '',
    preferredCategories: '',
    offerFrequency: '',
    specificRequirements: '',
    panTanNumber: '',
    gstin: '',
    bankAccountDetails: 'NA',
    contactEmail: '',
    contactPhoneNumber: '',
    contactPhoneNumber2: '',
    membershipPlan: '',
    panTanImage: null,
    gstinImage: null,
    mobileNumber: localStorage.getItem('mobileNumber') || '', // Retrieve mobile number
    category: '',  // Added category key
    subCategory: '' // Added subCategory key
  });

  const mobileNumber = localStorage.getItem('mobileNumber');


  const signatureRef = useRef(null);
  const [signatureData, setSignatureData] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loadin
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [merchants, setMerchants] = useState([]);
  const [filteredMerchants, setFilteredMerchants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')
  


  const city = {
    "Mumbai" : ['Juhu', 'Andheri (W)'],
    "Kolkata" : ['Park Street', 'Ballygunge']
  }


   // Fetch merchants data
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

  // Fetch merchants on component mount
  useEffect(() => {
    fetchMerchants();
  }, []);


    // Handle search input change
    const handleSearchChange = (e) => {
      const query = e.target.value;
      setSearchQuery(query);
  
      // Filter merchants based on the search query
      const filtered = merchants.filter((merchant) =>
        merchant.nameOfBusiness.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMerchants(filtered);
    };

    const handleSelectMerchant = (merchant) => {
      setFormData({
        ...formData,
        mainid: merchant._id,
        businessName: merchant.nameOfBusiness,
        category: merchant.category,  // Storing category
        subCategory: merchant.subCategory // Storing subcategory
      });
    
      setSearchQuery(merchant.nameOfBusiness);
      setFilteredMerchants([]); // Clear dropdown after selection
    
    };
    

  const clearSignature = () => {
    signatureRef.current.clear();
    setSignatureData("");
  };

  const saveSignature = () => {
    if (signatureRef.current.isEmpty()) {
      alert("Please provide a signature.");
    } else {
      const dataURL = signatureRef.current.toDataURL();
      setSignatureData(dataURL);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert("Please accept the terms and conditions.");
      return; // Stop form submission
    }

    // Check if signature is provided
    if (!signatureData) {
      alert("Please provide a signature before submitting.");
      return;
    }

    // Prepare form data for submission
    const formToSubmit = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        if (key === "profileImage" || key === "panTanImage" || key === "gstinImage") {
          formToSubmit.append(key, formData[key]);
        } else {
          formToSubmit.append(key, formData[key]);
        }
      }
    }

    // Append signature data as a base64 image string
    formToSubmit.append("signature", signatureData);

    setLoading(true); // Set loading to true when submitting


    try {
      // Send form data to the backend API (use the correct endpoint)
      const response = await fetch('https://fieldteam.localite.services/api/addmerchant', {
        method: 'POST',
        body: formToSubmit,
      });

      if (response.ok) {
        setShowSuccessPopup(true);
        setFormData({
          mainid:'',
          city: '',
          area: '',
          personName: '',
          lastName: '',
          password: '',
          profileImage: null,
          businessName: '',
          businessType: 'NA',
          businessAddress: '',
          websiteUrl: '',
          operationHours: '',
          yearsOfBusiness: '',
          numberOfEmployees: '',
          productDescription: '',
          preferredCategories: '',
          offerFrequency: '',
          specificRequirements: '',
          panTanNumber: '',
          gstin: '',
          bankAccountDetails: 'NA',
          contactEmail: '',
          contactPhoneNumber: '',
          contactPhoneNumber2: '',
          membershipPlan: '',
          panTanImage: null,
          gstinImage: null,
          mobileNumber: localStorage.getItem('mobileNumber') || '',
        });
        setSignatureData("");
        navigate('/dashboard'); // Redirect to the dashboard
      } else {
        alert("There was an error submitting the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form.");
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };
  

  const closePopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div style={{padding:'10px'}}>
      <img style={{width:'100px'}} src="https://localite.services/w_logo.png" alt="" />
      <hr />
      <br />
      <h3 style={{textAlign:'center' }}>Merchant Onboarding Form</h3>
      <form onSubmit={handleSubmit}>
        <hr />

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

        <h3>Personal Information</h3>
        <hr />
        <br />
        <div>
          <label>
            First Name:
            <input
              type="text"
              name="personName"
              value={formData.personName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Set Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Logo Image:
            <input
              type="file"
              name="profileImage"
              onChange={handleChange}
              accept="image/*"
              required
            />
          </label>
        </div>
        <hr />

        {/* Business Information */}
        <h3>Business Information</h3>
        <hr />
        <br />
        <div>
        <label>
        Business Name:
        <input
          type="text"
          name="businessName"
          value={searchQuery}
          onChange={handleSearchChange}
          required
          placeholder="Search business..."
        />
      </label>
      {/* Dropdown for search results */}
      {filteredMerchants.length > 0 && (
        <ul style={{ border: '1px solid #ccc', padding: '0' }}>
          {filteredMerchants.map((merchant) => (
            <li
              key={merchant._id}
              onClick={() => handleSelectMerchant(merchant)}
              style={{
                listStyle: 'none',
                padding: '5px',
                cursor: 'pointer',
                background: '#f9f9f9',
              }}
            >
              {merchant.nameOfBusiness}
            </li>
          ))}
        </ul>
      )}
          {/* <label>
            Business Category:
            <select 
          name="businessType" 
          value={formData.businessType} 
          onChange={handleChange} 
        >
          <option value="">Select Category</option>
          {Object.keys(categories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
          ))}
        </select>
          </label> */}

          
          {formData.category && (
  <div>
    <h4>Category: {formData.category}</h4>
    <h4>Subcategory: {formData.subCategory}</h4>
  </div>
)}
<br />




          <label>
            Business Address:
            <input
              type="text"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Website URL:
            <input
              type="text"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
            />
          </label>
          <label>
            Operation Hours:
            <input
              type="text"
              name="operationHours"
              value={formData.operationHours}
              onChange={handleChange}
            />
          </label>
          <label>
            Years of Business:
            <input
              type="number"
              name="yearsOfBusiness"
              value={formData.yearsOfBusiness}
              onChange={handleChange}
            />
          </label>
          <label>
            Number of Employees:
            <input
              type="number"
              name="numberOfEmployees"
              value={formData.numberOfEmployees}
              onChange={handleChange}
            />
          </label>
          <label>
            Business Description:
            <textarea
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
            />
          </label>
          <label>
  Preferred Categories:
  <select
    name="preferredCategories"
    value={formData.preferredCategories}
    onChange={handleChange}
    style={{
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "16px",
      width: "100%",
    }}
  >
    <option value="">Select a Category</option>

    {/* Automotive & Transport */}
    <option value="Automotive & Transport">Automotive & Transport</option>

    {/* Clothing and Personal Care */}
    <option value="Clothing">Clothing</option>
    <option value="Jewellery">Jewellery</option>
    <option value="Personal Care">Personal Care</option>
    <option value="Salon & Spa">Salon & Spa</option>
    <option value="Skin Care">Skin Care</option>

    {/* Food & Beverages */}
    <option value="Food & Beverages">Food & Beverages</option>

    {/* Home & Maintenance */}
    <option value="Home & Maintenance">Home & Maintenance</option>

    {/* Education and Professional Services */}
    <option value="Education and Learning">Education and Learning</option>
    <option value="Professional Services">Professional Services</option>

    {/* Healthcare & Wellness */}
    <option value="Healthcare & Wellness">Healthcare & Wellness</option>
    <option value="Hair Care">Hair Care</option>

    {/* Entertainment & Leisure */}
    <option value="Entertainment & Leisure">Entertainment & Leisure</option>

    {/* Dry Cleaning Services */}
    <option value="Dry Cleaning Services">Dry Cleaning Services</option>

    {/* Pet Care */}
    <option value="Pet & Petcare">Pet & Petcare</option>

    {/* Other */}
    <option value="Other">Other</option>
  </select>
</label>

          <label>
            Offer Frequency:
            <input
              type="text"
              name="offerFrequency"
              value={formData.offerFrequency}
              onChange={handleChange}
            />
          </label>
         
          <label>
            PAN/TAN Number:
            <input
              type="text"
              name="panTanNumber"
              value={formData.panTanNumber}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            PAN/TAN Card Image:
            <input
              type="file"
              name="panTanImage"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </label>

          <label>
            GSTIN:
            <input
              type="text"
              name="gstin"
              value={formData.gstin}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            GSTIN Image:
            <input
              type="file"
              name="gstinImage"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </label>

          {/* <label>
            Bank Account Number:
            <input
              name="bankAccountDetails"
              value={formData.bankAccountDetails}
              onChange={handleChange}
            />
          </label> */}
          
        </div>

        {/* Contact Information */}
        <hr />
        <h3>Contact Information</h3>
        <hr />
        <br />
        <div>
          <label>
            Contact Email:
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Contact Phone Number:
            <input
              type="tel"
              name="contactPhoneNumber"
              value={formData.contactPhoneNumber}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Contact Phone Number 2:
            <input
              type="tel"
              name="contactPhoneNumber2"
              value={formData.contactPhoneNumber2}
              onChange={handleChange}
            />
          </label>
        </div>

        <label>
            Merchant Location Link:
            <input
              name="specificRequirements"
              value={formData.specificRequirements}
              onChange={handleChange}
              required
            />
          </label>

        {/* Membership Details */}
        <div>
          <label>
            Membership Plan:
            <select 
    name="membershipPlan" 
    value={formData.membershipPlan} 
    onChange={handleChange} 
  >
    <option value="">Select Membership Plan</option>
    <option value="1Month">1 Month</option>
    <option value="3Months">3 Months</option>
    <option value="6Months">6 Months</option>
    <option value="12Months">12 Months</option>
  </select>
          </label>
        </div>

        {/* Signature Section */}
        <div>
          <h3>Merchant Signature</h3>
          <div
            style={{
              border: "1px solid black",
              width: "100%",
              height: "200px",
              marginBottom: "10px",
            }}
          >
            <SignatureCanvas
              ref={signatureRef}
              penColor="black"
              canvasProps={{ width: 300, height: 200, className: "sigCanvas" }}
            />
          </div>
          <div style={{display:'flex', gap:'10px'}}>

          <button style={{backgroundColor:'green',color:'white'}} type="button" onClick={saveSignature}>
            Save Signature
          </button>
          <button style={{backgroundColor:'yellow' ,color:'black'}} type="button" onClick={clearSignature}>
            Clear Signature
          </button>
          </div>
        </div>

        {signatureData && (
          <div>
            <h4>Saved Signature:</h4>
            <img
              src={signatureData}
              alt="Saved Signature"
              style={{ width: "20%", border: "1px solid black" }}
            />
          </div>
        )}
<br />
  {/* Terms and Conditions Checkbox in one line */}
  <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)' }}> {/* Added flex and alignItems */}
        <input
          type="checkbox"
          id="termsCheckbox" // Added an ID for the label to associate with
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          style={{marginLeft:'-50px'}}
        />
        <label style={{marginLeft:'-100px'}} htmlFor="termsCheckbox"> {/* Use htmlFor and style the label */}
          I accept all <a href="/terms" target="_blank" rel="noopener noreferrer" color='blue' >terms and conditions</a>
        </label>
      </div>

        {/* Submit Button */}
        <div>
        <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>        </div>
      </form>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div
          style={{
            position: "fixed",
            top: "60%",
            left: "36%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2>Form Submitted Successfully!</h2>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
};
