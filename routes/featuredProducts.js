const express = require('express');
const router = express.Router();
const FeaturedProduct = require('../models/FeaturedProduct'); // adjust path if needed

// ✅ Get all featured products
router.get('/', async (req, res) => {
  try {
    const products = await FeaturedProduct.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Create new featured product
router.post('/', async (req, res) => {
  try {
    const { title, description, price, image, sellerName, status } = req.body;
    const newProduct = new FeaturedProduct({
      title,
      description,
      price,
      image,
      sellerName,
      status: status || 'Pending'
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Update product info
router.put('/:id', async (req, res) => {
  try {
    const updated = await FeaturedProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Delete product
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await FeaturedProduct.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ FIXED: Update approval/rejection status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const product = await FeaturedProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    product.status = status;
    await product.save();
    res.json({ message: `Product ${status}` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
