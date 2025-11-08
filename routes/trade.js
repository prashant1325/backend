const express = require('express');
const router = express.Router();
const Trade = require('../models/Trade');

// Get all trades
router.get('/', async (req, res) => {
  try {
    const trades = await Trade.find();
    res.json(trades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new trade
router.post('/', async (req, res) => {
  try {
    const { title, condition, description, image, status, sellerName } = req.body;

    if (!title || !condition || !description || !image || !sellerName) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const trade = new Trade({ title, condition, description, image, status, sellerName });
    await trade.save();
    res.status(201).json(trade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update trade status (Admin)
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedTrade = await Trade.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedTrade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete trade
router.delete('/:id', async (req, res) => {
  try {
    await Trade.findByIdAndDelete(req.params.id);
    res.json({ message: "Trade deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
