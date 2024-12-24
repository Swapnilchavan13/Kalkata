import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from "react-signature-canvas";

export const Merchantonboarding = () => {
  const navigate = useNavigate();

  const categories = ['Automotive & Transport', 'Clothing', 'Dry Cleaning Services', 'Education and Learning', 'Entertainment & Leisure', 'Food & Beverages', 'Hair Care', 'Healthcare & Wellness', 'Home & Maintenance', 'Jewellery', 'Pet & Petcare', 'Personal Care', 'Professional Services', 'Salon & Spa', 'Skin Care', 'Other'];
  const [formData, setFormData] = useState({
    personName: '',
    lastName: '',
    password: '',
    profileImage: null,
    businessName: '',
    businessType: '',
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
    bankAccountDetails: '',
    contactEmail: '',
    contactPhoneNumber: '',
    contactPhoneNumber2: '',
    membershipPlan: '',
    panTanImage: null,
    gstinImage: null,
    mobileNumber: localStorage.getItem('mobileNumber') || '', // Retrieve mobile number
  });

  const signatureRef = useRef(null);
  const [signatureData, setSignatureData] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loadin

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
          personName: '',
          lastName: '',
          password: '',
          profileImage: null,
          businessName: '',
          businessType: '',
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
          bankAccountDetails: '',
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
            Profile Image:
            <input
              type="file"
              name="profileImage"
              onChange={handleChange}
              accept="image/*"
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
              value={formData.businessName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Business Type:
            <select 
          name="businessType" 
          value={formData.businessType} 
          onChange={handleChange} 
        >
          <option value="">Select Business Type</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
          </label>
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
            Specific Requirements:
            <textarea
              name="specificRequirements"
              value={formData.specificRequirements}
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

          <label>
            Bank Account Number:
            <input
              name="bankAccountDetails"
              value={formData.bankAccountDetails}
              onChange={handleChange}
            />
          </label>
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
