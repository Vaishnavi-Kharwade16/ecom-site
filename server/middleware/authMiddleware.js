const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization required." });
  }

  const token = auth.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "supersecret");
    const user = await User.findById(payload.id).select("-password");
    if (!user) return res.status(401).json({ error: "Invalid token." });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token." });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required." });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
