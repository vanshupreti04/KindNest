const Organisation = require('../models/Organisation');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

// Signup Organisation
exports.signupOrganisation = async (req, res) => {
  const { organisationName, email, password, address, phoneNumber, aadharNumber } = req.body;

  if (!organisationName || !email || !password || !address || !phoneNumber || !aadharNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingOrganisation = await Organisation.findOne({ email });
    if (existingOrganisation) {
      return res.status(400).json({ message: 'Organisation already exists' });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const organisation = new Organisation({
      organisationName,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      aadharNumber,
    });
    await organisation.save();

    res.status(201).json({ message: 'Organisation registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.loginOrganisation = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const organisation = await Organisation.findOne({ email });
    if (!organisation) {
      return res.status(404).json({ message: 'Organisation not found' });
    }

    const isMatch = await bcrypt.compare(password, organisation.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Include organisation ID in the response
    res.status(200).json({ 
      message: 'Login successful', 
      organisationId: organisation._id, organisation 
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Get Organisation Profile
exports.getOrganisationProfile = async (req, res) => {
  const organisationId = req.params.id;  // Get organisation ID from URL params

  try {
    // Find organisation by ID
    const organisation = await Organisation.findById(organisationId);

    // If organisation is not found, return an error message
    if (!organisation) {
      return res.status(404).json({ message: 'Organisation not found' });
    }

    // If organisation is found, send the data as response
    return res.status(200).json({ organisation });
  } catch (error) {
    console.error('Error fetching organisation:', error);
    return res.status(500).json({ message: 'Error fetching organisation data' });
  }
};

exports.updateOrganisation = async (req, res) => {
  const organisationId = req.params.id; // Extract organisation ID from route params
  const updatedData = req.body; // Data from frontend

  try {
    const updatedOrganisation = await Organisation.findByIdAndUpdate(
      organisationId,
      updatedData,
      { new: true, runValidators: true } // Return the updated document and validate inputs
    );

    if (!updatedOrganisation) {
      return res.status(404).json({ message: 'Organisation not found' });
    }

    res.status(200).json({ message: 'Organisation details updated successfully', organisation: updatedOrganisation });
  } catch (error) {
    console.error('Error updating organisation:', error);
    res.status(500).json({ message: 'Failed to update organisation details' });
  }
};

// Get All Organisations
exports.getAllOrganisations = async (req, res) => {
  try {
    const organisations = await Organisation.find(); // Fetch all organisations from the database
    res.status(200).json({ organisations });
  } catch (error) {
    console.error('Error fetching organisations:', error);
    res.status(500).json({ message: 'Error fetching organisations' });
  }
};

// Upload/Update Organisation Profile Picture
exports.updateProfilePicture = [
  upload.single('profilePicture'),
  async (req, res) => {
    const { organisationId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const updatedOrganisation = await Organisation.findByIdAndUpdate(
        organisationId,
        { 
          profilePicture: { 
            data: req.file.buffer, 
            contentType: req.file.mimetype 
          } 
        },
        { new: true }
      );

      if (!updatedOrganisation) {
        return res.status(404).json({ message: 'Organisation not found' });
      }

      res.status(200).json({ message: 'Profile picture updated successfully', organisation: updatedOrganisation });
    } catch (error) {
      console.error('Error updating profile picture:', error);
      res.status(500).json({ message: 'Failed to update profile picture' });
    }
  },
];

// Get Organisation Profile Picture
exports.getProfilePicture = async (req, res) => {
  const { organisationId } = req.params;

  try {
    const organisation = await Organisation.findById(organisationId);
    if (!organisation || !organisation.profilePicture) {
      return res.status(404).json({ message: 'Profile picture not found' });
    }

    res.set('Content-Type', organisation.profilePicture.contentType);
    res.send(organisation.profilePicture.data);
  } catch (error) {
    console.error('Error fetching profile picture:', error);
    res.status(500).json({ message: 'Failed to fetch profile picture' });
  }
};