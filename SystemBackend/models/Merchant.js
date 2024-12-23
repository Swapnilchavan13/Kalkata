// models/Merchant.js
const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
    personName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String }, // Store image URL or path
    businessName: { type: String, required: true },
    businessType: { type: String, required: true },
    businessAddress: { type: String, required: true },
    websiteUrl: { type: String },
    operationHours: { type: String },
    yearsOfBusiness: { type: Number },
    numberOfEmployees: { type: Number },
    productDescription: { type: String },
    preferredCategories: { type: String },
    offerFrequency: { type: String },
    specificRequirements: { type: String },
    panTanNumber: { type: String, required: true },
    panTanImage: { type: String }, // Store image URL or path
    gstin: { type: String, required: true },
    gstinImage: { type: String }, // Store image URL or path
    bankAccountDetails: { type: String },
    contactEmail: { type: String, required: true },
    contactPhoneNumber: { type: String, required: true },
    contactPhoneNumber2: { type: String },
    membershipPlan: { type: String },
    mobileNumber: { type: String, required: true }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  });

module.exports = mongoose.model('Merchant', merchantSchema);
