import React, { useState, useEffect } from "react";

export const Contentmanagement = () => {
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [shopName, setShopName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [addedBy, setAddedBy] = useState(null);
  const [businessDetails, setBusinessDetails] = useState(null);

  const areas = {
    Mumbai: ["Juhu", "Andheri (W)"],
    Kolkata: ["Park Street", "Ballygunge"],
  };

  useEffect(() => {
    if (city && area) {
      fetch(`https://fieldteam.localite.services/api/getmerchantsdata`)
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter((shop) => shop.city === city && shop.area === area);
          setShops(filtered);
          setFilteredShops(filtered);
        })
        .catch((err) => console.error("Error fetching shops:", err));
    }
  }, [city, area]);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setShopName(value);
    if (!selectedShop) {
      const filtered = shops.filter((shop) =>
        shop.nameOfBusiness.toLowerCase().includes(value)
      );
      setFilteredShops(filtered);
    }
  };

  const handleSelectShop = (shop) => {
    setSelectedShop(shop);
    setShopName(shop.nameOfBusiness);
    setFilteredShops([]);

    fetch(`https://fieldteam.localite.services/api/registrations`)
      .then((res) => res.json())
      .then((data) => {
        const addedByUser = data.find((user) => user.mobileNumber === shop.mobileNumber);
        setAddedBy(addedByUser || null);
      })
      .catch((err) => console.error("Error fetching added by:", err));

    fetch(`https://fieldteam.localite.services/api/getmerchants`)
      .then((res) => res.json())
      .then((data) => {
        const businessInfo = data.merchants.find((merchant) => merchant.mainid === shop._id);
        setBusinessDetails(businessInfo || null);
      })
      .catch((err) => console.error("Error fetching business details:", err));
  };

  const handleSendEmail = () => {
    if (!addedBy || !addedBy.email) {
      alert("No email found for the added-by user.");
      return;
    }
  
    if (!selectedShop) {
      alert("No shop selected. Please select a shop before sending the email.");
      return;
    }
  
    if (!businessDetails) {
      alert("Business details not available. Please try again.");
      return;
    }
  
    const subject = encodeURIComponent("Shop Onboarding Summary");
  
    const body = encodeURIComponent(`
  Shop Details:
  -----------------------
  Shop Name: ${selectedShop.nameOfBusiness || "N/A"}
  City: ${selectedShop.city || "N/A"}
  Area: ${selectedShop.area || "N/A"}
  Business Type: ${businessDetails.businessType || "N/A"}
  Business Address: ${businessDetails.businessAddress || "N/A"}
  Operation Hours: ${businessDetails.operationHours || "N/A"}
  Years in Business: ${businessDetails.yearsOfBusiness || "N/A"}
  Number of Employees: ${businessDetails.numberOfEmployees || "N/A"}
  Product Description: ${businessDetails.productDescription || "N/A"}
  Offer Frequency: ${businessDetails.offerFrequency || "N/A"}
  PAN/TAN: ${businessDetails.panTanNumber || "N/A"}
  GSTIN: ${businessDetails.gstin || "N/A"}
  Contact Email: ${businessDetails.contactEmail || "N/A"}
  Contact Phone: ${businessDetails.contactPhoneNumber || "N/A"}
  Date Onboarded: ${date || "N/A"}
  Time Onboarded: ${time || "N/A"}
  
  Added By:
  -----------------------
  Name: ${addedBy.contactPerson || "N/A"}
  Mobile: ${addedBy.mobileNumber || "N/A"}
  Email: ${addedBy.email || "N/A"}
  `);
  
    // Open Gmail compose email in a new tab
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${addedBy.email}&su=${subject}&body=${body}`,
      "_blank"
    );
  };
  
  

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Content Management</h2>

      <label>City:</label>
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">Select City</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Kolkata">Kolkata</option>
      </select>

      {city && (
        <>
          <label>Area:</label>
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="">Select Area</option>
            {areas[city].map((area, index) => (
              <option key={index} value={area}>
                {area}
              </option>
            ))}
          </select>
        </>
      )}

      {area && (
        <>
          <label>Search Shop:</label>
          <input
            type="text"
            value={shopName}
            onChange={handleSearchChange}
            placeholder="Type shop name..."
            disabled={!!selectedShop}
          />

          {shopName && filteredShops.length > 0 && !selectedShop && (
            <ul style={{ border: "1px solid #ccc", padding: "10px", listStyle: "none" }}>
              {filteredShops.map((shop) => (
                <li
                  key={shop._id}
                  style={{
                    cursor: "pointer",
                    padding: "5px",
                    borderBottom: "1px solid #eee",
                  }}
                  onClick={() => handleSelectShop(shop)}
                >
                  {shop.nameOfBusiness}
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {selectedShop && (
        <>
          <label>Select Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

          <label>Select Time:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </>
      )}

      {selectedShop && date && time && (
        <button
          onClick={handleSendEmail}
          style={{ marginTop: "10px", padding: "10px", cursor: "pointer" }}
        >
          Show Summary & Send Email
        </button>
      )}

      {selectedShop && date && time && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "15px" }}>
          <h3>Summary</h3>
          <p><strong>Shop Name:</strong> {selectedShop.nameOfBusiness}</p>
          <p><strong>City:</strong> {selectedShop.city}</p>
          <p><strong>Area:</strong> {selectedShop.area}</p>
          <p><strong>Address:</strong> {selectedShop.address}</p>
          <p><strong>Contact:</strong> {selectedShop.contactNo}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>

          {addedBy && (
            <>
              <h4>Added By</h4>
              <p><strong>Name:</strong> {addedBy.contactPerson}</p>
              <p><strong>Mobile:</strong> {addedBy.mobileNumber}</p>
              <p><strong>Email:</strong> {addedBy.email}</p>
            </>
          )}

          {businessDetails && (
            <>
              <h4>Business Details</h4>
              <p><strong>Owner:</strong> {businessDetails.personName} {businessDetails.lastName}</p>
              <p><strong>Business Name:</strong> {businessDetails.businessName}</p>
              <p><strong>Business Type:</strong> {businessDetails.businessType}</p>
              <p><strong>Employees:</strong> {businessDetails.numberOfEmployees}</p>
              <p><strong>Offer:</strong> {businessDetails.offerFrequency}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
