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
const OfferData = require('./models/OfferData');

const Registration = require('./models/Registration'); // Add this import


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



  // POST Request to Register a New User
app.post('/register', async (req, res) => {
  const { contactPerson, mobileNumber, email, loginPin, dateCreated } = req.body;

  try {
    // Create a new registration entry
    const newRegistration = new Registration({
      contactPerson,
      mobileNumber,
      email,
      loginPin,
      dateCreated,
    });

    // Save the registration entry to the database
    await newRegistration.save();

    res.status(201).json({ message: 'Registration successful!', newRegistration });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ message: 'Error in registration. Please try again later.' });
  }
});

// GET Request to Retrieve All Registrations
app.get('/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find(); // Retrieve all registrations from the database
    res.status(200).json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ message: 'Error fetching registrations.' });
  }
});

// PUT route to update location after user logs in
app.put('/update-location/:mobileNumber', async (req, res) => {
  const { mobileNumber } = req.params;
  const { latitude, longitude } = req.body; // Get latitude and longitude from the request body

  try {
    // Find the user by their mobile number
    const user = await Registration.findOne({ mobileNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the latitude and longitude fields
    user.latitude = latitude;
    user.longitude = longitude;

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Location updated successfully', user });
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


  // Route to handle POST request and file upload
app.post('/addmerchantdata', upload.fields([
    { name: 'shopFrontImage', maxCount: 1 },
    { name: 'streetImage', maxCount: 1 },
  ]), async (req, res) => {
    try {
      const { 
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
        contactStatus, 
        additionalOption, 
        registrationFormFilled, 
        kycDone,
        visitDateTime,
        decisionMakerAvailable
      } = req.body;
        
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
        contactStatus, 
        additionalOption, 
        registrationFormFilled, 
        kycDone,
        visitDateTime,
        decisionMakerAvailable
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


// Route to handle PUT request for editing merchant data
app.put('/editmerchantdata/:id', upload.fields([
  { name: 'shopFrontImage', maxCount: 1 },
  { name: 'streetImage', maxCount: 1 },
]), async (req, res) => {
  try {
    const { id } = req.params; // Get the merchant ID from the request parameters

    // Check if the merchant exists
    const existingMerchant = await MerchantData.findById(id);
    if (!existingMerchant) {
      return res.status(404).json({ message: 'Merchant data not found' });
    }

    // Prepare updated fields
    const updates = { ...req.body };

    // Check if files are uploaded and update images
    if (req.files && req.files['shopFrontImage']) {
      updates.shopFrontImage = `/uploads/${req.files['shopFrontImage'][0].filename}`;
    }
    if (req.files && req.files['streetImage']) {
      updates.streetImage = `/uploads/${req.files['streetImage'][0].filename}`;
    }

    // Manually update the createdAt timestamp (if you want to update it)
    updates.createdAt = new Date().toISOString(); // Set the createdAt to current time
    updates.updatedAt = new Date().toISOString(); // Ensure updatedAt is updated

    // Update the merchant data in the database
    const updatedMerchant = await MerchantData.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation is run on the updated data
    });

    // Respond with the updated merchant data
    res.status(200).json(updatedMerchant);
  } catch (error) {
    console.error('Error updating merchant data:', error);
    res.status(500).json({ message: 'Error updating merchant data', error });
  }
});



  // Route to fetch all merchant data
app.get('/getmerchantsdata', async (req, res) => {
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
app.get('/getmerchantsdata/:mobileNumber', async (req, res) => {
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
app.post('/addmerchant', upload.fields([
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
        city: body.city,
        area: body.area,
        mainid: body.mainid,
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
app.get('/getmerchants', async (req, res) => {
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

   // GET route to fetch merchants by mobile number
app.get('/getmerchants/:mobileNumber', async (req, res) => {
    try {
      // Extract the mobile number from the request parameters
      const { mobileNumber } = req.params;
  
      // Fetch all merchants with the given mobile number from the database
      const merchants = await Merchant.find({ mobileNumber });
  
      // If no merchants are found, return an error message
      if (!merchants.length) {
        return res.status(404).json({ message: 'No merchants found with this mobile number' });
      }
  
      // Send success response with all matching merchants data
      res.status(200).json({ merchants });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });


     // GET route to fetch merchants by mobile number
app.get('/getmerchantsself/:contactPhoneNumber', async (req, res) => {
  try {
    // Extract the mobile number from the request parameters
    const { contactPhoneNumber } = req.params;

    // Fetch all merchants with the given mobile number from the database
    const merchants = await Merchant.find({ contactPhoneNumber });

    // If no merchants are found, return an error message
    if (!merchants.length) {
      return res.status(404).json({ message: 'No merchants found with this mobile number' });
    }

    // Send success response with all matching merchants data
    res.status(200).json({ merchants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


  // POST: Add Offer Data
app.post('/addOfferData', upload.fields([{ name: 'image1' }, { name: 'image2' }]), async (req, res) => {
    try {
      const { city, area, mainid, brand, title, headline, description, excerptDescription, units, price, discountedPercentage, mobileNumber, offermade, offerposted } = req.body;
  
      const newOfferData = new OfferData({
        city,
        area,
        mainid,
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
        offermade,
        offerposted
      });
  
      await newOfferData.save();
      res.status(201).json({ message: 'Offer data added successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add offer data' });
    }
  });

 // PUT: Edit Offer Data (Update Status using _id)
app.put('/editOfferData/:id', async (req, res) => {
  try {
    const { id } = req.params; // Use the _id field to identify the document
    const { offermade, offerposted } = req.body;

    // Find the offer by _id and update the offermade and offerposted status
    const updatedOffer = await OfferData.findByIdAndUpdate(
      id, // Search by _id
      { $set: { offermade, offerposted } }, // Update the fields
      { new: true } // Returns the updated document
    );

    if (!updatedOffer) {
      return res.status(404).json({ error: 'Offer not found' });
    }

    res.status(200).json({ message: 'Offer data updated successfully!', updatedOffer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update offer data' });
  }
});
  
  // GET: Fetch Offer Data
  app.get('/getOfferData', async (req, res) => {
    try {
      const offers = await OfferData.find();
      res.status(200).json(offers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch offer data' });
    }
  });

// GET: Fetch All Offer Data by mainid
app.get('/getOfferDataByMainId/:mainid', async (req, res) => {
  try {
      const { mainid } = req.params;
      const offers = await OfferData.find({ mainid }); // Fetch all documents with the given mainid
      if (offers.length === 0) {
          return res.status(404).json({ error: 'No offers found for the given mainid' });
      }
      res.status(200).json(offers); // Return all matching offers
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch offer data by mainid' });
  }
});



// Start the Server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});