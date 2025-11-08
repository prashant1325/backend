const mongoose = require('mongoose');

const SellProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  image: String,
  sellerName: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sell', SellProductSchema);
