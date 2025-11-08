const express = require('express');
const router = express.Router();
const SellProduct = require('../models/SellProduct');
const FeaturedProduct = require('../models/FeaturedProduct');

// GET all sell requests
router.get('/requests', async (req, res) => {
  try {
    const products = await SellProduct.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sell requests' });
  }
});

// UPDATE status (Approve or Reject)
router.put('/update/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const product = await SellProduct.findByIdAndUpdate(req.params.id, { status }, { new: true });

    // If approved, move to FeaturedProduct collection for Buy page
    if (status === 'Approved') {
      const newFeatured = new FeaturedProduct({
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        sellerName: product.sellerName,
        status: 'Approved',
      });
      await newFeatured.save();
    }

    res.json({ message: 'Status updated', product });
  } catch (err) {
    res.status(500).json({ message: 'Error updating status' });
  }
});

// DELETE sell request
router.delete('/delete/:id', async (req, res) => {
  try {
    await SellProduct.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

module.exports = router;
