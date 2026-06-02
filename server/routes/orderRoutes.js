const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
// const { protect } = require("../middleware/auth");
const { authMiddleware } = require("../middleware/authMiddleware");


router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, totalPrice, shippingAddress } = req.body;
    const order = await Order.create({
      user: req.user._id,
      items,
      totalPrice,
      shippingAddress,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/my-orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;