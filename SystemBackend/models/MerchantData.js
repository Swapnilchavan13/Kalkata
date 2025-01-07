const mongoose = require('mongoose');

const merchantDataSchema = new mongoose.Schema({
  city: {
    type: String,
  },
  area: {
    type: String,
  },
  category: {
    type: String,
  },
  subCategory: {
    type: String,
  },
  nameOfBusiness: {
    type: String,
  },
  contactNo: {
    type: String,
  },
  address: {
    type: String,
  },
  website: {
    type: String,
    default: '',
  },
  instagram: {
    type: String,
    default: '',
  },
  facebook: {
    type: String,
    default: '',
  },
  youtube: {
    type: String,
    default: '',
  },
  comment: {
    type: String,
    default: '',
  },
  shopFrontImage: {
    type: String, // You can store the image URL here after uploading
    default: null,
  },
  streetImage: {
    type: String, // You can store the image URL here after uploading
    default: null,
  },
  mobileNumber: {
    type: String,
  },
  contactStatus: {
    type: String,
    default: '', // Default empty string
  },
  additionalOption: {
    type: String,
    default: '', // Default empty string
  },
  registrationFormFilled: {
    type: Boolean,
    default: false, // Default false
  },
  kycDone: {
    type: Boolean,
    default: false, // Default false
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const MerchantData = mongoose.model('MerchantData', merchantDataSchema);

module.exports = MerchantData;
