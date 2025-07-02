const express = require('express');
const { signupOrganisation, loginOrganisation, getOrganisationProfile, updateOrganisation, getAllOrganisations, updateProfilePicture, getProfilePicture } = require('../controllers/organisationController');
const router = express.Router();

router.post('/signup_organisation', signupOrganisation);

router.post('/login', loginOrganisation);

// Route to get organisation profile by ID
router.get('/profile/:id', getOrganisationProfile);

router.put('/update/:id', updateOrganisation);

// Route to get all organisations
router.get('/all', getAllOrganisations);

// Route to update profile picture
router.post('/update-profile-picture', updateProfilePicture);

// Route to get profile picture
router.get('/profile-picture/:organisationId', getProfilePicture);


module.exports = router;
