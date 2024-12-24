import React, { useState } from 'react';

export const Registration = () => {
  const [formData, setFormData] = useState({
    contactPerson: '',
    mobileNumber: '',
    email: '',
    loginPin: '',
    dateCreated: new Date().toISOString().split('T')[0], // Default to today's date in YYYY-MM-DD format
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage the submission process

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable the button during submission

    try {
      const response = await fetch('https://fieldteam.localite.services/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      if (response.ok) {
        const result = await response.json();
        alert('Registration successful!');
        console.log(result); // Log the response from the API
        // You can redirect the user to another page or reset the form here
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false); // Re-enable the button after submission
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="contactPerson">Contact Person:</label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="loginPin">Login Pin:</label>
          <input
            type="password"
            id="loginPin"
            name="loginPin"
            value={formData.loginPin}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dateCreated">Date Created:</label>
          <input
            type="date"
            id="dateCreated"
            name="dateCreated"
            value={formData.dateCreated}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};
