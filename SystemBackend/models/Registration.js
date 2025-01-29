const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  contactPerson: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true, // Ensure mobile number is unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  loginPin: {
    type: String,
    required: true,
    minlength: 4, // Ensure the pin is at least 4 digits long
  },
  dateCreated: {
    type: Date,
    default: Date.now, // Automatically set the current date if not provided
  },
  latitude: {
    type: Number, // Store latitude as a number
  },
  longitude: {
    type: Number, // Store longitude as a number
  },
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
