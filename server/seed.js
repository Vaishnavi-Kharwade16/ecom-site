require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const User = require("./models/User");

const loadProducts = async () => {
  const products = require("./data/products");
  return products.map((product) => ({
    ...product,
    price: Number(product.price),
    originalPrice: product.originalPrice !== null && product.originalPrice !== undefined ? Number(product.originalPrice) : null,
    rating: Number(product.rating) || 0,
    reviews: Number(product.reviews) || 0,
  }));
};

const seed = async () => {
  await connectDB();
  const products = await loadProducts();
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`✅ Seeded ${products.length} products.`);

  const adminEmail = "admin";
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const hashed = await bcrypt.hash("admin", 10);
    await User.create({ name: "Admin", email: adminEmail, password: hashed, role: "admin" });
    console.log("✅ Admin user created: admin / admin");
  } else {
    console.log("ℹ️ Admin user already exists.");
  }

  process.exit(0);
};

seed().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
