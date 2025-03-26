import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Merchantdatacollection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    city: '',
    area: '',
    category: '',
    subCategory: '',
    nameOfBusiness: '',
    contactNo: '',
    address: '',
    visitDateTime: "",
    contactStatus:'',
    additionalOption:'',
    registrationFormFilled: false,
    kycDone: false,
    website: '',
    instagram: '',
    facebook: '',
    youtube: '',
    comment: '',
    shopFrontImage: null,
    streetImage: null,
    mobileNumber: localStorage.getItem('mobileNumber') || '', // Retrieve mobile number
    decisionMakerAvailable: 'Yes', // Default to "Yes"
  });

  const [subCategories, setSubCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [showLoadingPopup, setShowLoadingPopup] = useState(false); // Track loading popup visibility


  const city = {
    "Mumbai" : ['Juhu', 'Andheri (W)'],
    "Kolkata" : ['Park Street', 'Ballygunge']
  }

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
  

  const handleFileChange = (e) => {
    const { name, files } = e.target;
  
    if (files && files[0]) {
      // Directly set the file to state without compression
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    }
  };
  
  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
  }));

  if (name === 'category') {
      setSubCategories(categories[value] || []);
      setFormData((prevData) => ({ ...prevData, subCategory: '' }));
  }

  if (name === 'city') {
      setFormData((prevData) => ({ ...prevData, area: '' }));
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable the submit button
    setShowLoadingPopup(true); // Show loading popup

    try {
      const dataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          dataToSend.append(key, value);
        }
      });

      const response = await fetch('https://fieldteam.localite.services/api/addmerchantdata', {
        method: 'POST',
        body: dataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Merchant data submitted:', result);
        alert('Data submitted successfully!');
        // Optionally reset form
        setFormData({
          city: '',
          area: '',
          category: '',
          subCategory: '',
          nameOfBusiness: '',
          contactNo: '',
          address: '',
          visitDateTime: "",
          contactStatus:'',
          additionalOption:'',
          registrationFormFilled: false,
          kycDone: false,
          website: '',
          instagram: '',
          facebook: '',
          youtube: '',
          comment: '',
          shopFrontImage: null,
          streetImage: null,
          mobileNumber: localStorage.getItem('mobileNumber') || '',
          decisionMakerAvailable: 'Yes',
        });
        setSubCategories([]);
        navigate('/dashboard'); // Redirect to the dashboard
      } else {
        const error = await response.json();
        console.error('Submission error:', error);
        alert('Failed to submit data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false); // Enable the submit button
      setShowLoadingPopup(false); // Hide loading popup
    }
  };

  return (
    <div  style={{ maxWidth: '600px', margin: 'auto' }}>
      <img style={{width:'100px'}} src="https://localite.services/w_logo.png" alt="" />
      <hr />
      <h1>Merchant Data Collection</h1>
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
        <div>
          <label>Select Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {Object.keys(categories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Sub-category:</label>
          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            required
          >
            <option value="">Select Sub-category</option>
            {subCategories.map((subCategory, index) => (
              <option key={index} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Name Of Business:</label>
          <input
            type="text"
            name="nameOfBusiness"
            value={formData.nameOfBusiness}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contact No.:</label>
          <input
            type="tel"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Decision Maker Available:</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                name="decisionMakerAvailable"
                value="Yes"
                checked={formData.decisionMakerAvailable === 'Yes'}
                onChange={handleChange}
              />
              Yes
            </label>
            <label style={{ display: 'flex', alignItems: 'center' }}>
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


        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
        <label>Contact Status:</label>
        <select
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

      {formData.contactStatus === "Contact again" && (
  <div className="contact-again-container">
    <label className="form-label">Next Steps:</label>
    <select
      name="additionalOption"
      value={formData.additionalOption}
      onChange={handleChange}
      required
      className="form-select"
    >
      <option value="">Select Option</option>
      <option value="Send details digitally">Send details digitally</option>
      <option value="Physically visit again">Physically visit again</option>
      <option value="Other">Other</option>
    </select>

    {formData.additionalOption === "Physically visit again" && (
      <div className="date-time-container">
        <label className="form-label">Date and Time of Visit:</label>
        <input
          type="datetime-local"
          name="visitDateTime"
          value={formData.visitDateTime}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>
    )}
  </div>
)}


{formData.contactStatus === "Onboarded" && (
  <div className="checkbox-group">
    <div className="checkbox-item">
      <label className="checkbox-label">
        <input
          type="checkbox"
          name="registrationFormFilled"
          checked={formData.registrationFormFilled}
          onChange={handleChange}
          className="checkbox-input"
        />
        Registration form filled
      </label>
    </div>
    <div className="checkbox-item">
      <label className="checkbox-label">
        <input
          type="checkbox"
          name="kycDone"
          checked={formData.kycDone}
          onChange={handleChange}
          className="checkbox-input"
        />
        KYC Done
      </label>
    </div>
  </div>
)}


      {formData.contactStatus === "Not interested" && (
        <div>
          <label>Reason:</label>
          <select
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

        <div>
          <label>Website:</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Instagram:</label>
          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Facebook:</label>
          <input
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>YouTube:</label>
          <input
            type="text"
            name="youtube"
            value={formData.youtube}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Shop Front Image:</label>
          <input
            type="file"
            name="shopFrontImage"
            required
            onChange={handleFileChange}
            accept="image/*"
          />
          {formData.shopFrontImage && (
            <img
              src={URL.createObjectURL(formData.shopFrontImage)}
              alt="Shop Front"
              style={{ width: '100px', height: 'auto', marginTop: '10px' }}
            />
          )}
        </div>
        <div>
          <label>Street Image:</label>
          <input
            type="file"
            name="streetImage"
            required
            onChange={handleFileChange}
            accept="image/*"
          />
          {formData.streetImage && (
            <img
              src={URL.createObjectURL(formData.streetImage)}
              alt="Street"
              style={{ width: '100px', height: 'auto', marginTop: '10px' }}
            />
          )}
        </div>
        <div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        </div>
      </form>
    </div>
  );
};
