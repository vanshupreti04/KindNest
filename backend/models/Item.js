const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  itemPicture: { 
    data: Buffer, 
    contentType: String  
  },
  donator: {
    donatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donator', required: true },
    donatorName: { type: String, required: true },
    donatorPhone: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Item', itemSchema);
