const mongoose = require('mongoose');

const donatorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  aadharNumber: { type: String, required: true },
  profilePicture: {
    data: Buffer,
    contentType: String
  },
});

module.exports = mongoose.model('Donator', donatorSchema);
