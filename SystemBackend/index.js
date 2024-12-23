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




// POST route for merchant onboarding
app.post('/api/addmerchant', upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'panTanImage', maxCount: 1 },
    { name: 'gstinImage', maxCount: 1 }
  ]), async (req, res) => {
    try {
      const { body, files } = req;
  
      // Check if the required fields are present
      if (!body.personName || !body.lastName || !body.password || !body.businessName || !body.businessType || !body.businessAddress || !body.contactEmail || !body.contactPhoneNumber || !body.mobileNumber) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Create the merchant data object
      const merchantData = {
        personName: body.personName,
        lastName: body.lastName,
        password: body.password,
        profileImage: files.profileImage ? `/uploads/${files.profileImage[0].filename}` : null,
        businessName: body.businessName,
        businessType: body.businessType,
        businessAddress: body.businessAddress,
        websiteUrl: body.websiteUrl,
        operationHours: body.operationHours,
        yearsOfBusiness: body.yearsOfBusiness,
        numberOfEmployees: body.numberOfEmployees,
        productDescription: body.productDescription,
        preferredCategories: body.preferredCategories,
        offerFrequency: body.offerFrequency,
        specificRequirements: body.specificRequirements,
        panTanNumber: body.panTanNumber,
        panTanImage: files.panTanImage ? `/uploads/${files.panTanImage[0].filename}` : null,
        gstin: body.gstin,
        gstinImage: files.gstinImage ? `/uploads/${files.gstinImage[0].filename}` : null,
        bankAccountDetails: body.bankAccountDetails,
        contactEmail: body.contactEmail,
        contactPhoneNumber: body.contactPhoneNumber,
        contactPhoneNumber2: body.contactPhoneNumber2,
        membershipPlan: body.membershipPlan,
        mobileNumber: body.mobileNumber
      };
  
      // Create a new merchant document
      const newMerchant = new Merchant(merchantData);
  
      // Save the merchant to the database
      await newMerchant.save();
  
      // Send success response
      res.status(201).json({ message: 'Merchant onboarded successfully', merchant: newMerchant });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });


  // GET route to fetch all merchants
app.get('/api/getmerchants', async (req, res) => {
    try {
      // Fetch all merchants from the database
      const merchants = await Merchant.find();
  
      // If no merchants are found, return an empty array
      if (!merchants.length) {
        return res.status(404).json({ message: 'No merchants found' });
      }
  
      // Send success response with all merchants data
      res.status(200).json({ merchants });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });


  // POST: Add Offer Data
app.post('/api/addOfferData', upload.fields([{ name: 'image1' }, { name: 'image2' }]), async (req, res) => {
    try {
      const { brand, title, headline, description, excerptDescription, units, price, discountedPercentage, mobileNumber } = req.body;
  
      const newOfferData = new OfferData({
        brand,
        title,
        headline,
        description,
        excerptDescription,
        units,
        price,
        discountedPercentage,
        image1: req.files['image1'][0].path,
        image2: req.files['image2'][0].path,
        mobileNumber,
      });
  
      await newOfferData.save();
      res.status(201).json({ message: 'Offer data added successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add offer data' });
    }
  });
  
  // GET: Fetch Offer Data
  app.get('/api/getOfferData', async (req, res) => {
    try {
      const offers = await OfferData.find();
      res.status(200).json(offers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch offer data' });
    }
  });
  


// Start the Server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});