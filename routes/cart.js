const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// ✅ Add item to cart (for user)
router.post("/add", async (req, res) => {
  try {
    const { userId, productId, name, price, image, type } = req.body;

    if (!userId || !productId || !name)
      return res.status(400).json({ msg: "Missing required fields" });

    const newItem = new Cart({
      userId,
      productId,
      name,
      price: price || 0,   // default 0 if missing
      image: image || "",
      type: type || "buy", // default type = buy
      status: "Pending",   // default status = Pending
      quantity: 1          // default quantity
    });

    await newItem.save();
    res.status(201).json({ msg: "Item added to cart", item: newItem });
  } catch (err) {
    console.error("Cart add error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Get user’s cart items
router.get("/:userId", async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.params.userId });
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Delete a cart item by cart _id
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ msg: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Update cart item status (from admin approval)
router.patch("/update-status", async (req, res) => {
  try {
    const { userId, productId, status } = req.body;

    if (!userId || !productId || !status)
      return res.status(400).json({ msg: "Missing required fields" });

    const cartItem = await Cart.findOneAndUpdate(
      { userId, productId },
      { status },
      { new: true }
    );

    if (!cartItem) return res.status(404).json({ msg: "Cart item not found" });

    res.json({ msg: "Status updated", cartItem });
  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
