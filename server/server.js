// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const connectDB = require("./config/db");
// const productRoutes = require("./routes/productRoutes");
// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: "https://ecom-site-r9xi.vercel.app",
//     credentials: true,
//   })
// );
// app.use(express.json());

// const startServer = async () => {
//   await connectDB();
//   const orderRoutes = require("./routes/orderRoutes");
// app.use("/api/orders", orderRoutes);

//   // Routes
//   app.use("/api/auth", authRoutes);
//   app.use("/api/products", productRoutes);
//   app.use("/api/users", userRoutes);

//   // Health check
//   app.get("/", (req, res) => {
//     res.json({ message: "Backend running" });
//   });

//   // Start server
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
//   });
// };

// startServer();



const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
const allowedOrigins = [
  "https://ecom-site-r9xi.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin
      if (!origin) {
        return callback(null, true);
      }

      // Allow deployed Vercel frontend
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow localhost on any port
      // Examples:
      // http://localhost:5173
      // http://localhost:5174
      // http://localhost:5175
      if (/^http:\/\/localhost:\d+$/.test(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
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