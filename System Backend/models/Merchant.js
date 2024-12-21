const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  businessName: { type: String, required: true },
  businessType: { type: String, required: true },
  businessAddress: { type: String, required: true },
  websiteUrl: { type: String, required: false },
  operationHours: { type: String, required: false },
  yearsInBusiness: { type: Number, required: false },
  numberOfEmployees: { type: Number, required: false },
  productDescription: { type: String, required: false },
  preferredCategories: { type: String, required: true },
  offerFrequency: { type: String, required: false },
  specificRequirements: { type: String, required: false },
  panTanNumber: { type: String, required: true },
  gstin: { type: String, required: true },
  bankAccountDetails: { type: String, required: false },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  contactPhone2: { type: String, required: false },
  membershipPlan: { type: String, required: false },
  mobileNumber: { type: String, required: true },
});

module.exports = mongoose.model('Merchant', merchantSchema);
