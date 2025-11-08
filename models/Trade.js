const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  condition: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  sellerName: { type: String, required: true }, // required for filtering
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trade', tradeSchema);
