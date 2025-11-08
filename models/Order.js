// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true }, // username or userId
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  productTitle: { type: String, required: true },
  productCategory: { type: String, enum: ['buy', 'sell', 'trade'], required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
