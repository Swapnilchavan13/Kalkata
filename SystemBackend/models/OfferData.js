const mongoose = require('mongoose');

const OfferDataSchema = new mongoose.Schema({
  mainid: {type: String},
  city: {type: String},
  area: {type: String},
  brand: { type: String, required: true },
  title: { type: String, required: true },
  headline: { type: String, required: true },
  description: { type: String, required: true },
  excerptDescription: { type: String, required: true },
  units: { type: Number, required: true },
  price: { type: String, required: true },
  discountedPercentage: { type: Number, required: true },
  image1: { type: String, required: true },
  image2: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  offermade: { type: Boolean, default: false }, // New field
  offerposted: { type: Boolean, default: false }, // New field
}, { timestamps: true });

module.exports = mongoose.model('OfferData', OfferDataSchema);
