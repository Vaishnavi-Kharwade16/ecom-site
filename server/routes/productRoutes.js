// const express = require("express");
// const Product = require("../models/Product");
// const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

// const router = express.Router();

// // GET all products
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // POST a new product (admin only)
// router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     await product.save();
//     res.json(product);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// module.exports = router;


const express = require("express");
const Product = require("../models/Product");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// 🔍 GET all products WITH Search and Filter capability
router.get("/", async (req, res) => {
  try {
    const { search, category } = req.query;
    let queryObj = {};

    // 1. Jar query madhe 'search' text asel, tar check kara (Case-Insensitive)
    if (search) {
      queryObj.name = { $regex: search, $options: "i" };
    }

    // 2. Jar query madhe 'category' select keli asel (ani ti 'All' nasel), tar condition laava
    if (category && category !== "All") {
      queryObj.category = category;
    }

    // Database madhun matching items shodha
    const products = await Product.find(queryObj);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🏢 POST a new product (admin only)
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;