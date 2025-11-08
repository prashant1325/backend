const mongoose = require('mongoose');

const SellSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  sellerName: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // Pending, Approved, Rejected
  type: { type: String, enum: ['user','featured'], default: 'user' } // separates admin and user products
}, { timestamps: true });

module.exports = mongoose.model('Sell', SellSchema);
