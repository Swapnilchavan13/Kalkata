import React, { useEffect, useState } from "react";

const MerchantFeedbackForm = () => {
  const [formData, setFormData] = useState({
    merchantName: "",
    contactPerson: "",
    enrolledOn: "",
    enrolledBy: "",
    storeRating: "",
    givenCatalogue: "",
    noCatalogueReason: "",
    usedApp: "",
    appRating: "",
    subscriptionDecision: "",
    comments: "",
  });

  const [onboardedByOptions, setOnboardedByOptions] = useState([]);
  const [merchantList, setMerchantList] = useState([]);
  const [filteredMerchants, setFilteredMerchants] = useState([]);


  useEffect(() => {
    // Fetch onboarding list
    fetch("https://fieldteam.localite.services/api/registrations")
      .then((res) => res.json())
      .then((data) => {
        setOnboardedByOptions(data);
      })
      .catch((err) => console.error("Error fetching onboarded list", err));
  }, []);


    // Fetch merchant names
    useEffect(() => {
        fetch("https://fieldteam.localite.services/api/getmerchants")
          .then((res) => res.json())
          .then((data) => setMerchantList(data.merchants))
          .catch((err) => console.error("Merchants fetch error:", err));
      }, []);
    
      const handleMerchantSearch = (e) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, merchantName: value }));
    
        const suggestions = merchantList.filter((merchant) =>
          merchant.businessName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredMerchants(suggestions);
      };


      const selectMerchant = (name) => {
        setFormData((prev) => ({ ...prev, merchantName: name }));
        setFilteredMerchants([]);
      };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://fieldteam.localite.services/api/merchantfeedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Merchant Feedback Form</h2>
      <br />
      
      <label>Name Of Merchant:</label>
      {/* Merchant Name Autocomplete */}
      <div style={{ position: "relative" }}>
        <input
          type="text"
          name="merchantName"
          placeholder="Name of Merchant"
          value={formData.merchantName}
          onChange={handleMerchantSearch}
          autoComplete="off"
          required
        />
        {filteredMerchants.length > 0 && (
          <ul
            style={{
              position: "absolute",
              background: "#fff",
              border: "1px solid #ccc",
              listStyle: "none",
              padding: 0,
              margin: 0,
              width: "100%",
              zIndex: 1000,
              maxHeight: 150,
              overflowY: "auto",
            }}
          >
            {filteredMerchants.map((merchant) => (
              <li
                key={merchant._id}
                onClick={() => selectMerchant(merchant.businessName)}
                style={{ padding: "8px", cursor: "pointer" }}
              >
                {merchant.businessName}
              </li>
            ))}
          </ul>
        )}
      </div>
      <label>Contact Person:</label>
      <input type="text" name="contactPerson" placeholder="Contact Person" required onChange={handleChange} />
      <label>Enrolled On:</label>
      <input type="date" name="enrolledOn" required onChange={handleChange} />
      <label>Enrolled By:</label>
      <select name="enrolledBy" onChange={handleChange} required>
        <option value="">Select Enrolled By</option>
        {onboardedByOptions.map((person) => (
          <option key={person._id} value={person.contactPerson}>
            {person.contactPerson}
          </option>
        ))}
      </select>
      <label>Rate your post and store on Localite:</label>
      <select name="storeRating" required onChange={handleChange}>
        <option value="">Select</option>
        <option>Excellent - 5</option>
        <option>Good - 4</option>
        <option>Average - 3</option>
        <option>Poor - 2</option>
        <option>Very Bad - 1</option>
      </select>

      <label>Have you given your catalogue?</label>
      <select name="givenCatalogue" required onChange={handleChange}>
        <option value="">Select</option>
        <option>Yes</option>
        <option>No</option>
      </select>

      {formData.givenCatalogue === "No" && (
        <input type="text" name="noCatalogueReason" placeholder="Why not?" onChange={handleChange} />
      )}

      <label>Have you used the app?</label>
      <select name="usedApp" required onChange={handleChange}>
        <option value="">Select</option>
        <option>Yes</option>
        <option>No</option>
      </select>

      <label>Rate the app:</label>
      <select name="appRating" required onChange={handleChange}>
        <option value="">Select</option>
        <option>Excellent - 5</option>
        <option>Good - 4</option>
        <option>Average - 3</option>
        <option>Poor - 2</option>
        <option>Very Bad - 1</option>
      </select>

      <label>Subscription decision</label>
      <select name="subscriptionDecision" required onChange={handleChange}>
        <option value="">Select</option>
        <option>Will Pay from May</option>
        <option>Delist the App</option>
      </select>

      <textarea name="comments" placeholder="Any other comments?" onChange={handleChange}></textarea>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MerchantFeedbackForm;
