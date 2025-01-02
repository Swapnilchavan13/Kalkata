import React, { useEffect, useState } from 'react';
import '../Style/allmerchantdata.css';

export const Allmerchantdata = () => {
  const [users, setUsers] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [filteredMerchants, setFilteredMerchants] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  // Fetch users
  useEffect(() => {
    fetch('https://fieldteam.localite.services/api/registrations')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  // Fetch all merchants
  useEffect(() => {
    fetch('https://fieldteam.localite.services/api/getmerchantsdata')
      .then((response) => response.json())
      .then((data) => setMerchants(data))
      .catch((error) => console.error('Error fetching merchants:', error));
  }, []);

  // Filter merchants by selected user
  useEffect(() => {
    if (selectedUser) {
      const filtered = merchants.filter(
        (merchant) => merchant.mobileNumber === selectedUser
      );
      setFilteredMerchants(filtered);
    } else {
      setFilteredMerchants([]);
    }
  }, [selectedUser, merchants]);

  const formatISTDate = (utcDate) => {
    const date = new Date(utcDate);
    return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  };

  return (
    <div className="container">
    <h1 className="title">All Merchant Data</h1>

    <div className="user-selection">
      <label htmlFor="user-select">Select User:</label>
      <select
        id="user-select"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">-- Select a User --</option>
        {users.map((user) => (
          <option key={user._id} value={user.mobileNumber}>
            {user.contactPerson}
          </option>
        ))}
      </select>
    </div>

    {selectedUser && (
      <div className="total-entries">
        Total Entries by User: {filteredMerchants.length}
      </div>
    )}

    {filteredMerchants.length > 0 ? (
      <table className="merchant-table">
        <thead>
          <tr>
            <th>Name of Business</th>
            <th>City</th>
            <th>Area</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Contact No</th>
            <th>Address</th>
            <th>Website</th>
            <th>Shop Front Image</th>
            <th>Street Image</th>
            <th>Data Added Time (IST)</th>
          </tr>
        </thead>
        <tbody>
          {filteredMerchants.map((merchant) => (
            <tr key={merchant._id}>
              <td>{merchant.nameOfBusiness}</td>
              <td>{merchant.city}</td>
              <td>{merchant.area}</td>
              <td>{merchant.category}</td>
              <td>{merchant.subCategory}</td>
              <td>{merchant.contactNo}</td>
              <td>{merchant.address}</td>
              <td>{merchant.website}</td>
              <td>
                {merchant.shopFrontImage ? (
                  <a
                    href={`https://fieldteam.localite.services/api/${merchant.shopFrontImage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`https://fieldteam.localite.services/api/${merchant.shopFrontImage}`}
                      alt="Shop Front"
                      className="image-thumbnail"
                    />
                  </a>
                ) : (
                  'N/A'
                )}
              </td>
              <td>
                {merchant.streetImage ? (
                  <a
                    href={`https://fieldteam.localite.services/api/${merchant.streetImage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`https://fieldteam.localite.services/api/${merchant.streetImage}`}
                      alt="Street"
                      className="image-thumbnail"
                    />
                  </a>
                ) : (
                  'N/A'
                )}
              </td>
              <td>{formatISTDate(merchant.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : selectedUser ? (
      <p className="no-data">No merchants found for the selected user.</p>
    ) : (
      <p className="no-data">Please select a user to view merchant data.</p>
    )}
  </div>
);
};