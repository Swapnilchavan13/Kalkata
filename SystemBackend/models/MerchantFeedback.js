const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  merchantName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  enrolledOn: { type: Date, required: true },
  enrolledBy: { type: String, required: true },
  storeRating: { type: String, required: true },
  givenCatalogue: { type: String, required: true },
  noCatalogueReason: { type: String },
  usedApp: { type: String, required: true },
  appRating: { type: String, required: true },
  subscriptionDecision: { type: String, required: true },
  comments: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("MerchantFeedback", feedbackSchema);
