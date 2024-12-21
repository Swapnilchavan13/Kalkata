import React, { useRef, useState } from 'react';
import SignatureCanvas from "react-signature-canvas";

export const Merchantonboarding = () => {
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
  
    // Create a new FormData object
    const dataToSend = new FormData();
  
    // Append form data to FormData object
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        dataToSend.append(key, value);
      }
    });
  
    // Append signature data if available
    if (signatureData) {
      dataToSend.append('signature', signatureData);
    }
  
    try {
      // Send the form data to the backend (replace with your actual API endpoint)
      const response = await fetch('http://localhost:8050/api/addmerchantdata', {
        method: 'POST',
        body: dataToSend,
      });
  
      // Handle the response (success or error)
      if (response.ok) {
        console.log('Form submitted successfully');
        setShowSuccessPopup(true);
      } else {
        console.error('Error submitting form');
        // Optionally handle the error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally handle the error (e.g., show an error message)
    }
  
    // Clear form fields after submission
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
  
    setSignatureData(""); // Reset signature
  };
  

  const closePopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Merchant Onboarding Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
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
              required
            >
              <option value="Other">Other</option>
              <option value="Retail">Retail</option>
              <option value="Wholesale">Wholesale</option>
              {/* Add more options as needed */}
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
            Product Description:
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
              
            >
              <option value="Category1">Category 1</option>
              <option value="Category2">Category 2</option>
              {/* Add more options as needed */}
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
            <input
              type="text"
              name="membershipPlan"
              value={formData.membershipPlan}
              onChange={handleChange}
            />
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

          <button style={{backgroundColor:'green'}} type="button" onClick={saveSignature}>
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
          <button type="submit">Submit</button>
        </div>
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
