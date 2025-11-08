// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product'); // Your featured products model
const Sell = require('../models/Sell');       // Sell products
const Trade = require('../models/Trade');     // Trade products

// ✅ Create new order
router.post('/', async (req, res) => {
  try {
    const { user, productId, category, price } = req.body;

    if (!user || !productId || !category || !price) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check if product exists and approved
    let product;
    if (category === 'buy') product = await Product.findById(productId);
    else if (category === 'sell') product = await Sell.findById(productId);
    else if (category === 'trade') product = await Trade.findById(productId);

    if (!product) return res.status(404).json({ error: 'Product not found.' });
    if (product.status && product.status !== 'Approved') {
      return res.status(400).json({ error: 'Product not approved for purchase.' });
    }

    const order = new Order({
      user,
      productId,
      productTitle: product.title,
      productCategory: category,
      price
    });

    await order.save();
    res.status(201).json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all orders (admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
