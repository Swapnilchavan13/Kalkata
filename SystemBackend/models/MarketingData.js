const mongoose = require('mongoose');

const marketingSchema = new mongoose.Schema({
  mainid: mongoose.Schema.Types.ObjectId, // Reference to Merchant ID
  businessName: String,
  googleMapLink: String,
  googleReviewScore: Number,
  instaPageLink: String,
  instaPosts: Number,
  instaFollowers: Number,
  instaScore: Number,
  youtubePageLink: String,
  youtubeVideos: Number,
  youtubeViews: Number,
  whatsappBusiness: String, // "YES" or "NO"
  whatsappStore: String,    // "YES" or "NO"
  whatsappGroup: String,    // "YES" or "NO"
  anyPamplate: String,      // "YES" or "NO"
  interested: String,
  catalaugefilled: String,
  shopImage1: String,       // File path or URL
  shopImage2: String,
  shopImage3: String,
  customerBase: String,
  turnover: String,
  realEstatePhotos: String,
  mobileNumber: String
}, { timestamps: true }); // Adds createdAt & updatedAt fields

const MarketingData = mongoose.model('MarketingData', marketingSchema);

module.exports = MarketingData;
