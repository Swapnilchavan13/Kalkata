const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 8050;
const multer = require('multer');
const path = require('path');

const Merchant = require('./models/Merchant');

// MongoDB Connection
mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Unique filename to prevent overwrite
  },
});

const upload = multer({ storage: storage });

// POST endpoint to add a new merchant
app.post('/api/addmerchant', async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        password,
        businessName,
        businessType,
        businessAddress,
        websiteUrl,
        operationHours,
        yearsInBusiness,
        numberOfEmployees,
        productDescription,
        preferredCategories,
        offerFrequency,
        specificRequirements,
        panTanNumber,
        gstin,
        bankAccountDetails,
        contactEmail,
        contactPhone,
        contactPhone2,
        membershipPlan,
        mobileNumber
      } = req.body;
  
      // Create a new Merchant instance
      const newMerchant = new Merchant({
        firstName,
        lastName,
        password,
        businessName,
        businessType,
        businessAddress,
        websiteUrl,
        operationHours,
        yearsInBusiness,
        numberOfEmployees,
        productDescription,
        preferredCategories,
        offerFrequency,
        specificRequirements,
        panTanNumber,
        gstin,
        bankAccountDetails,
        contactEmail,
        contactPhone,
        contactPhone2,
        membershipPlan,
        mobileNumber
      });
  
      // Save the new merchant to the database
      await newMerchant.save();
  
      res.status(201).json({ message: 'Merchant added successfully', data: newMerchant });
    } catch (error) {
      console.error('Error adding merchant:', error);
      res.status(500).json({ message: 'Failed to add merchant', error: error.message });
    }
  });
  

// GET route for fetching all merchants
app.get('/api/merchants', async (req, res) => {
  try {
    const merchants = await Merchant.find(); // Fetch all merchants from the database
    res.status(200).json(merchants); // Return all merchants as a JSON response
  } catch (error) {
    console.error('Error fetching merchants:', error);
    res.status(500).json({ message: 'Failed to fetch merchants' });
  }
});

// GET route for fetching a merchant by mobile number
app.get('/api/merchant/:mobileNumber', async (req, res) => {
  try {
    const { mobileNumber } = req.params;
    const merchant = await Merchant.findOne({ mobileNumber }); // Find merchant by mobile number

    if (!merchant) {
      return res.status(404).json({ message: 'Merchant not found' });
    }

    res.status(200).json(merchant); // Return the merchant data as a JSON response
  } catch (error) {
    console.error('Error fetching merchant by mobile number:', error);
    res.status(500).json({ message: 'Failed to fetch merchant by mobile number' });
  }
});

// Start the Server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
