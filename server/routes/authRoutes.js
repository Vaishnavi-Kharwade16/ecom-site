const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET || "supersecret",
    { expiresIn: "7d" }
  );
};

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required." });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already registered." });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: "user" });

    const token = generateToken(user);
    const safeUser = { id: user._id, name: user.name, email: user.email, role: user.role };
    res.json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password." });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid email or password." });

    const token = generateToken(user);
    const safeUser = { id: user._id, name: user.name, email: user.email, role: user.role };
    res.json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
