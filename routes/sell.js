const express = require('express');
const router = express.Router();
// const Sell = require('../models/Sell');
const Sell = require("../models/Sell");


// GET all sell products
router.get('/', async (req, res) => {
  try {
    const products = await Sell.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new sell product (user submission)
router.post('/', async (req, res) => {
  try {
    const { title, description, price, image, sellerName } = req.body;
    const newProduct = new Sell({ title, description, price, image, sellerName, type:'user', status:'Pending' });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update status (admin approval)
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedProduct = await Sell.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a sell product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Sell.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
