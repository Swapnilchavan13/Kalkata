import React, { useEffect, useState } from "react";

const MerchantDetails = () => {
  const [users, setUsers] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [filteredMerchants, setFilteredMerchants] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users
    fetch("https://fieldteam.localite.services/api/registrations")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });

    // Fetch merchants
    fetch("https://fieldteam.localite.services/api/getmerchants")
      .then((response) => response.json())
      .then((data) => {
        setMerchants(data.merchants.reverse());
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching merchants:", error);
        setLoading(false);
      });
  }, []);

  const fetchOfferData = async (mainid) => {
    try {
      const response = await fetch(
        `https://fieldteam.localite.services/api/getOfferDataByMainId/${mainid}`
      );
      return response.json();
    } catch (error) {
      console.error(`Error fetching offer data for ID ${mainid}:`, error);
      return null;
    }
  };

  const handleUserChange = async (e) => {
    const user = e.target.value;
    setSelectedUser(user);

    let merchantsToDisplay = [];
    if (user === "all") {
      merchantsToDisplay = merchants;
    } else if (user) {
      merchantsToDisplay = merchants.filter(
        (merchant) => merchant.mobileNumber === user
      );
    }

    const updatedMerchants = await Promise.all(
      merchantsToDisplay.map(async (merchant) => {
        const offerData = merchant.mainid
          ? await fetchOfferData(merchant.mainid)
          : null;
        const totalContent = offerData ? offerData.length : 0;
        const totalCreated = offerData
          ? offerData.filter((item) => item.offermade).length
          : 0;
        const totalUploaded = offerData
          ? offerData.filter((item) => item.offerposted).length
          : 0;

        return {
          ...merchant,
          totalContent,
          totalCreated,
          totalUploaded,
        };
      })
    );

    setFilteredMerchants(updatedMerchants);
  };

  return (
    <div style={{ padding: "10px", backgroundColor: "#f9f9f9", color: "#333" }}>
      <header style={{ backgroundColor: "#4CAF50", color: "white", padding: "1rem", textAlign: "center" }}>
        <h1>Onboarded Merchant Details</h1>
      </header>

      <div className="container">
        {loading ? (
          <div className="loading" style={{ textAlign: "center", fontSize: "1.2rem", color: "#555" }}>
            Loading data...
          </div>
        ) : (
          <>
            <div className="user-select" style={{ marginBottom: "1rem" }}>
              <label htmlFor="userSelect">Select User: </label>
              <select
                id="userSelect"
                value={selectedUser}
                onChange={handleUserChange}
                style={{ marginTop: "5px", height: "40px" }}
              >
                <option value="">--Select User--</option>
                <option value="all">All</option>
                {users.map((user) => (
                  <option key={user.mobileNumber} value={user.mobileNumber}>
                    {user.contactPerson}
                  </option>
                ))}
              </select>
            </div>

            {selectedUser && (
              <div id="total-entries" className="total-entries" style={{ marginBottom: "1rem" }}>
                Total Entries: {filteredMerchants.length}
              </div>
            )}

            {filteredMerchants.length > 0 ? (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  margin: "1rem 0",
                }}
              >
                <thead>
                  <tr>
                    <th>Person Name</th>
                    <th>Business Name</th>
                    <th>Business Type</th>
                    <th>Address</th>
                    <th>Operation Hours</th>
                    <th>Years in Business</th>
                    <th>Employees</th>
                    <th>Contact Email</th>
                    <th>Contact Phone</th>
                    <th>Membership Plan</th>
                    <th>PAN Image</th>
                    <th>GSTIN Image</th>
                    <th>Time</th>
                    <th>Added By</th>
                    <th>Total Content Uploaded</th>
                    <th>Total Post Created</th>
                    <th>Total Post Uploaded</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMerchants.map((merchant) => (
                    <tr key={merchant.id}>
                      <td>{`${merchant.personName} ${merchant.lastName}`}</td>
                      <td>{merchant.businessName}</td>
                      <td>{merchant.businessType}</td>
                      <td>{merchant.businessAddress}</td>
                      <td>{merchant.operationHours}</td>
                      <td>{merchant.yearsOfBusiness}</td>
                      <td>{merchant.numberOfEmployees}</td>
                      <td>{merchant.contactEmail}</td>
                      <td>{merchant.contactPhoneNumber}</td>
                      <td>{merchant.membershipPlan}</td>
                      <td>
                        {merchant.panTanImage ? (
                          <a
                            href={`https://fieldteam.localite.services/api/${merchant.panTanImage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={`https://fieldteam.localite.services/api/${merchant.panTanImage}`}
                              alt="PAN"
                              style={{ width: "80px", borderRadius: "5px" }}
                            />
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td>
                        {merchant.gstinImage ? (
                          <a
                            href={`https://fieldteam.localite.services/api/${merchant.gstinImage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={`https://fieldteam.localite.services/api/${merchant.gstinImage}`}
                              alt="GSTIN"
                              style={{ width: "80px", borderRadius: "5px" }}
                            />
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td>{new Date(merchant.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
                      <td>{users.find((user) => user.mobileNumber === merchant.mobileNumber)?.contactPerson || "Unknown"}</td>
                      <td>{merchant.totalContent}</td>
                      <td>{merchant.totalCreated}</td>
                      <td>{merchant.totalUploaded}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No merchants found for the selected user.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MerchantDetails;
