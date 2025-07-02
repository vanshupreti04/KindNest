const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  donatorName: { type: String, required: true },
  donatorAddress: { type: String, required: true },
  donatorPhone: { type: String, required: true },
  message: { type: String, required: true },
  organisationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
