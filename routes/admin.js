const express = require('express');
const router = express.Router();
const FeaturedProduct = require('../models/FeaturedProduct');
const Cart = require('../models/Cart');

// ==========================
// FEATURED PRODUCTS
// ==========================

// Create product (admin)
router.post('/create', async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.title) return res.status(400).json({ message: 'Title required' });
    const product = new FeaturedProduct(payload);
    await product.save();
    return res.status(201).json(product);
  } catch (err) {
    console.error('admin.create', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// List featured products (admin view)
router.get('/featured', async (req, res) => {
  try {
    const products = await FeaturedProduct.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error('admin.featured', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await FeaturedProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    console.error('admin.update', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product
router.delete('/delete/:id', async (req, res) => {
  try {
    await FeaturedProduct.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('admin.delete', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==========================
// BUY REQUEST / CART APPROVAL
// ==========================

// Get all pending buy requests (cart items with type "buy")
router.get('/buy-requests', async (req, res) => {
  try {
    const requests = await Cart.find({ type: 'buy' }).sort({ dateAdded: -1 });
    res.json(requests);
  } catch (err) {
    console.error('admin.buy-requests', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update buy request status by cart _id (approve/reject)
router.patch('/buy-requests/:id', async (req, res) => {
  try {
    const { status } = req.body; // "Approved" or "Rejected"
    if (!status) return res.status(400).json({ error: 'Status required' });

    const cartItem = await Cart.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!cartItem) return res.status(404).json({ error: 'Cart item not found' });

    res.json(cartItem); // Return updated item
  } catch (err) {
    console.error('admin.update-buy-request', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update cart item status by userId + productId (used in cart.html for live status)
router.patch('/cart/update-status', async (req, res) => {
  try {
    const { userId, productId, status } = req.body;
    if (!userId || !productId || !status) return res.status(400).json({ message: 'Missing fields' });

    const updated = await Cart.findOneAndUpdate(
      { userId, productId },
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Cart item not found' });
    res.json(updated);
  } catch (err) {
    console.error('admin.cart-update-status', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
