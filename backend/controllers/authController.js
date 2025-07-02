const Donator = require('../models/Donator');
const Organisation = require('../models/Organisation');
const bcrypt = require('bcryptjs');

let otpStore = {}; 

// General OTP Generation (for Donators and others)
exports.generateOtp = (req, res) => {
  const { email, userType, userData } = req.body;

  if (!email || !userType) {
    return res.status(400).json({ message: 'Email and user type are required' });
  }

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  
  otpStore[email] = { otp, userType, userData }; 

  console.log(`Generated OTP for ${email}: ${otp}`); 

  res.status(200).json({ message: `OTP generated: ${otp}` }); 
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  const storedData = otpStore[email];

  if (storedData && storedData.otp === parseInt(otp)) {
    const { userType, userData } = storedData;

    if (userType === 'donator') {
      
      const { fullName, email, password, address, phoneNumber, aadharNumber } = userData;

      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const donator = new Donator({
          fullName,
          email,
          password: hashedPassword,
          address,
          phoneNumber,
          aadharNumber,
        });

        await donator.save();
        delete otpStore[email]; // Clear OTP after successful verification

        return res.status(200).json({ message: 'OTP verified and Donator registered successfully.' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error registering Donator' });
      }
    } else if (userType === 'organisation') {
      
      const { organisationName, email, password, address, phoneNumber, aadharNumber } = userData;

      try {
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
        delete otpStore[email]; // Clear OTP after successful verification

        return res.status(200).json({ message: 'OTP verified and Organisation registered successfully.' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error registering Organisation' });
      }
    }
  }

  return res.status(400).json({ message: 'Invalid OTP' });
};
