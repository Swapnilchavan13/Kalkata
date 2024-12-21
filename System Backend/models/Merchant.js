// models/Merchant.js
const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  personName: String,
  lastName: String,
  password: String,
  profileImage: String,
  businessName: String,
  businessType: String,
  businessAddress: String,
  websiteUrl: String,
  operationHours: String,
  yearsOfBusiness: Number,
  numberOfEmployees: Number,
  productDescription: String,
  preferredCategories: String,
  offerFrequency: String,
  specificRequirements: String,
  panTanNumber: String,
  gstin: String,
  bankAccountDetails: String,
  contactEmail: String,
  contactPhoneNumber: String,
  contactPhoneNumber2: String,
  membershipPlan: String,
  panTanImage: String,
  gstinImage: String,
  mobileNumber: String,
});

module.exports = mongoose.model('Merchant', merchantSchema);
