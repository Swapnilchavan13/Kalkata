import React, { useState } from 'react';


export const Merchantdatacollection = () => {
  const [formData, setFormData] = useState({
    city: '',
    area: '',
    category: '',
    subCategory: '',
    nameOfBusiness: '',
    contactNo: '',
    address: '',
    website: '',
    instagram: '',
    facebook: '',
    youtube: '',
    comment: '',
    shopFrontImage: null,
    streetImage: null,
    mobileNumber: localStorage.getItem('mobileNumber') || '', // Retrieve mobile number
  });

  const [subCategories, setSubCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [showLoadingPopup, setShowLoadingPopup] = useState(false); // Track loading popup visibility


  const city = {
    "Mumbai" : ['Juhu', 'Andheri (W)'],
    "Kolkata" : ['Park Street']
  }

  const categories = {
    'FOOD & BEVERAGES': [
      'Fine Dining', 'Casual Dining', 'Restaurant (fast food)', 'Ethnic Cuisines', 'Vegan & Vegetarian options', 'Bakeries', 'Cake Shops', 'Cafes (Coffee Shop)', 'Tea House', 'Bars & Nightlife (Pubs)', 'Resto Bar', 'Club Lounges', 'Speciality Foods', 'Sweets Store', 'Milk Dairy Store', 'Icecream Parlour', 'Pop- Up Eateries Food Truck', 'Catering Service', 'Home kitchen services', 'Wine Shops', 'Idli & Dosa Shops', 'Organic Food Stores', 'Cloud Kitchen',
    ],
    'PROFESSIONAL SERVICES': [
      'Law Firms', 'Notaries', 'Real Estate Agency', 'Marketing Agency', 'Financial Services', 'Technology Services', 'Consulting Services', 'Accounting services', 'Graphic Designer', 'Website Designer', 'Photographer/ Videographer', 'Interior Designer', 'Architecture Firm', 'Lawyer', 'Webinars', 'Photographer/ Videographer', 'Graphic Designer', 'Website Designer',
    ],
    'ENTERTAINMENT & LEISURE': [
      'Movie Theaters', 'Drama Theaters/ Playhouse', 'Performing Arts Theaters', 'Sport Clubs & Academy', 'Recreation Clubs', 'Swimming Clubs', 'Dancing Workshops', 'Singing Workshops', 'Acting Classes', 'Gaming Zone', 'Amusement parks/ Adventures', 'Bands/ Djs', 'Workshops & Classes', 'Dance Classes', 'Music Schools', 'Art Classes',
    ],
    'HEALTHCARE & WELLNESS': [
      'General Clinics', 'Hospital & Medical Centres', 'Maternity Centre', 'Gynecologist Clinics', 'Diabtologist and endocrinologist', 'Special Children School', 'Kids Clothing & Products', 'Gastro Specialist', 'Psychiatrists', 'Mental Health Service', 'Physiotherapist', 'Acupuncturists', 'Orthopedic', 'Chiroprators', 'Pillates', 'Weight Loss Clinics', 'Dietician', 'Health & Wellness Retreats', 'Yoga Retreats', 'Pediatrician', 'Homeopathy', 'Allergy Clinics', 'Counsellors', 'Dietician',
    ],
    'AUTOMOTIVE & TRANSPORT': [
      'Used Car Dealership', 'Car Showrooms', 'Motorcycle Dealership', 'Motorcycle Showrooms', 'Tire Shops', 'Servicing center', 'Auto Spare Parts & Accessories', 'Car Washig Center', 'Bus/ Tempo Rental', 'Charter', 'Bicycle Shops', 'Electric Vehicle Charging Station', 'Cars Rental', 'Cab Services', 'Tire Shops', 'Motorcycle Showrooms',
    ],
    'EDUCATION & LEARNING': [
      'Private Schools', 'Public Schools', 'Preschool', 'Supplementary (Tutoring Service)', 'Colleges', 'Universities', 'Specialty Services', 'Continuing Education', 'Vocational Training', 'Special Children School', 'Home tutors', 'Language Classes (English/ Foreign)', 'Fashion Design School', 'Sporting goods store', 'Virtual Schools',
    ],
    'RETAIL & SHOPPING': [
      'Clothing (Men)', 'Clothing Women', 'Women Sarees & Ghagras', 'Boutiques', 'Home Decor/ Interior', 'Beauty Salons', 'Mobile Phones Store', 'Grocery stores/ Supermarkets', 'Toy Store', 'Jewellery Stores', 'Clothing Accessories', 'Footware Stores', 'Gift shop', 'Printing services', 'Speciality Store', 'Bags', 'Personal Care', 'Health/ Nutrition food stores', 'Personal Trainner', 'Pet Supply Store', 'Laundry Services', 'Cleaning Services(Residential Cleaner)',
    ],
    'HOME & MAINTAINANCE': [
      'Hardware store', 'Home Goods', 'Nail Salon', 'Painting & Ceiling Services', 'Tree Cutting Services', 'Decorators', 'Gardening & landscaping', 'Plumbing Services and Store', 'Repair Shops', 'Cleaning Services(Residential Cleaner)', 'Pest Control (Exterminatiors)', 'Domestic help Agencies', 'Cleaning Services(Residential Cleaner)', 'Smart Home installations(Home Automation)',
    ],
    'PERSONAL CARE': [
      'Hair Salons', 'Beauty Salons', 'Day Spas', 'Massage Parlours', 'Astheticians', 'Makeup Artist', 'Massage Parlours', 'Personal Trainner', 'Pet Grooming Services', 'Yoga Studios', 'Pet clinic',
    ],
    'MISCELLANEOUS': [
      'Co-Working Space', 'Courier Services', 'Lounges', 'Post office', 'Non-Profit Charities', 'Waste Management Services', 'Recycling Center', 'Utilities Water', 'Gas', 'Electricians', 'Security Guard Services', 'Security Services (Home Security Systems)',
    ],
    'ACCOMODATION': [
      'Hotels', 'Hostels', 'Rentals/ PGs', 'Community Centers',
    ],
    'COMMUNITY & GOVERNMENT': [
      'Libraries', 'Municipal offices', 'Religious Organisation', 'Community Centers', 'Waste Management Services', 'Recycling Center', 'Youth Program', 'Moving & Storage Company', 'Book Stores', 'Stationary Store', 'Smart Home installations(Home Automation)', 'Sewing Supplies', 'Pest Control (Exterminatiors)',
    ],
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
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
  
      const response = await fetch('http://62.72.59.146:8050/api/addmerchantdata', {
        method: 'POST',
        body: dataToSend,
      });
  
      // Check if the response is successful
      if (response.ok) {
        // Try parsing the response as JSON
        try {
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
            website: '',
            instagram: '',
            facebook: '',
            youtube: '',
            comment: '',
            shopFrontImage: null,
            streetImage: null,
            mobileNumber: localStorage.getItem('mobileNumber') || '',
          });
          setSubCategories([]);
        } catch (jsonError) {
          // If JSON parsing fails, log the error and alert the user
          console.error('Error parsing JSON response:', jsonError);
          alert('Received an unexpected response from the server.');
        }
      } else {
        // Check if the response is HTML
        const contentType = response.headers.get('Content-Type');
        const errorText = await response.text();
        
        if (contentType && contentType.includes('text/html')) {
          // If the response is HTML, it is likely an error page
          console.error('Received HTML error response:', errorText);
          alert('The server returned an error page. Please try again later.');
        } else {
          // Attempt to parse the error response as JSON
          try {
            const error = JSON.parse(errorText);
            console.error('Submission error:', error);
            alert(`Failed to submit data: ${error.message || 'Unknown error'}`);
          } catch (parseError) {
            console.error('Error parsing error response:', parseError);
            alert('Failed to submit data: Server returned an unexpected error.');
          }
        }
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
    <div>
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
