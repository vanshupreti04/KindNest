const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  image: {type: Buffer},
});

module.exports = mongoose.model('Feedback', feedbackSchema);
