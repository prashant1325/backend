const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, default: 0 }, // allow 0 for trade items
  image: { type: String, default: "" },
  type: { type: String, default: "buy" }, // "buy" or "trade"
  status: { type: String, default: "Pending" }, // "Pending", "Approved", "Rejected"
  quantity: { type: Number, default: 1 },
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Cart", cartSchema);
