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
const MerchantData = require('./models/MerchantData');


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

// Multer configuration to store images in the 'uploads' folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });


  // Route to handle POST request and file upload
app.post('/api/addmerchantdata', upload.fields([
    { name: 'shopFrontImage', maxCount: 1 },
    { name: 'streetImage', maxCount: 1 },
  ]), async (req, res) => {
    try {
      const { city, area, category, subCategory, nameOfBusiness, contactNo, address, website, instagram, facebook, youtube, comment, mobileNumber } = req.body;
  
      // Get the uploaded image URLs
      const shopFrontImage = req.files['shopFrontImage'] ? `/uploads/${req.files['shopFrontImage'][0].filename}` : null;
      const streetImage = req.files['streetImage'] ? `/uploads/${req.files['streetImage'][0].filename}` : null;
  
      // Create a new merchant data entry
      const newMerchant = new MerchantData({
        city,
        area,
        category,
        subCategory,
        nameOfBusiness,
        contactNo,
        address,
        website,
        instagram,
        facebook,
        youtube,
        comment,
        mobileNumber,
        shopFrontImage,
        streetImage,
      });
  
      // Save to database
      await newMerchant.save();
  
      // Respond with the saved merchant data
      res.status(201).json(newMerchant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving merchant data', error });
    }
  });

  // Route to fetch all merchant data
app.get('/api/getmerchantsdata', async (req, res) => {
    try {
      // Fetch all merchant data from the database
      const merchants = await MerchantData.find();
  
      // Respond with the list of merchants
      res.status(200).json(merchants);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching merchant data', error });
    }
  });


  // Route to fetch merchant data by mobile number
app.get('/api/getmerchantsdata/:mobileNumber', async (req, res) => {
    try {
        const { mobileNumber } = req.params;

        // Fetch merchant data by mobile number
        const merchant = await MerchantData.find({ mobileNumber });

        if (!merchant) {
            return res.status(404).json({ message: 'Merchant not found' });
        }

        // Respond with the merchant data
        res.status(200).json(merchant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching merchant data by mobile number', error });
    }
});



// Route to handle POST request and file upload for merchant images
app.post('/api/addmerchantdata', upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'panTanImage', maxCount: 1 },
    { name: 'gstinImage', maxCount: 1 },
  ]), async (req, res) => {
    try {
      const { personName, lastName, password, businessName, businessType, businessAddress, websiteUrl, operationHours, yearsOfBusiness, numberOfEmployees, productDescription, preferredCategories, offerFrequency, specificRequirements, panTanNumber, gstin, bankAccountDetails, contactEmail, contactPhoneNumber, contactPhoneNumber2, membershipPlan, mobileNumber } = req.body;
  
      // Get the uploaded image URLs
      const profileImage = req.files['profileImage'] ? `/uploads/${req.files['profileImage'][0].filename}` : null;
      const panTanImage = req.files['panTanImage'] ? `/uploads/${req.files['panTanImage'][0].filename}` : null;
      const gstinImage = req.files['gstinImage'] ? `/uploads/${req.files['gstinImage'][0].filename}` : null;
    
      // Create a new merchant data entry
      const newMerchant = {
        personName,
        lastName,
        password,
        businessName,
        businessType,
        businessAddress,
        websiteUrl,
        operationHours,
        yearsOfBusiness,
        numberOfEmployees,
        productDescription,
        preferredCategories,
        offerFrequency,
        specificRequirements,
        panTanNumber,
        gstin,
        bankAccountDetails,
        contactEmail,
        contactPhoneNumber,
        contactPhoneNumber2,
        membershipPlan,
        mobileNumber,
        profileImage,
        panTanImage,
        gstinImage,
      };
  
      // Save to database (this can be adjusted based on your database setup)
      // Example: await MerchantData.create(newMerchant);
  
      // Respond with the saved merchant data
      res.status(201).json(newMerchant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving merchant data', error });
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



// Start the Server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
