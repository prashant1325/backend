const express = require('express');
const router = express.Router();
const BuyRequest = require('../models/BuyRequest'); // Create this model
const Cart = require('../models/Cart');

// ✅ Get all pending buy requests
router.get('/buy-requests', async (req, res) => {
  try {
    const requests = await BuyRequest.find().populate('product'); // populate if product is ref
    res.json(requests); // must return an array
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch buy requests' });
  }
});

// ✅ Update buy request status
router.patch('/buy-requests/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const request = await BuyRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!request) return res.status(404).json({ error: 'Request not found' });

    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

module.exports = router;
