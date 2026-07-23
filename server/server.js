const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://ecom-site-pbb5.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

const startServer = async () => {
  await connectDB();
  const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/users", userRoutes);

  // Health check
  app.get("/", (req, res) => {
    res.json({ message: "Backend running" });
  });

  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();
