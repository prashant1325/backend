// backend/models/FeaturedProduct.js
const mongoose = require('mongoose');

const FeaturedProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, default: 0 },
  image: { type: String, default: '' }, // store base64 or image URL
  sellerName: { type: String, default: 'admin' },
  status: { type: String, default: 'Approved' } // Approved / Pending / Rejected
}, { timestamps: true });

module.exports = mongoose.model('FeaturedProduct', FeaturedProductSchema);
