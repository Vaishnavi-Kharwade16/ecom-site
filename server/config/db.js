

const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  const dbName = process.env.DB_NAME || "ecom-site";

  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  // console.log("Using DNS servers:", dns.getServers());


  try {
    await mongoose.connect(uri, { dbName });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;