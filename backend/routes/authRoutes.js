const express = require('express');
const { generateOtp, verifyOtp } = require('../controllers/authController'); 
const router = express.Router();

// General OTP routes
router.post('/generate-otp', generateOtp);  
router.post('/verify-otp', verifyOtp);     

module.exports = router;
