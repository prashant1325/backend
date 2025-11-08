const mongoose = require("mongoose");

const buyRequestSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  product: { type: Object, required: true }, // save product info snapshot
  status: { type: String, default: "Pending" }, // Pending / Approved / Rejected
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BuyRequest", buyRequestSchema);
