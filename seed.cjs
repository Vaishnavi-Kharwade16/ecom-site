const mongoose = require("mongoose");
require("dotenv").config({ path: "./server/.env" });
const Product = require("./server/models/Product");

const sampleProducts = [
  {
    name: "Minimal Leather Watch",
    price: 189.99,
    originalPrice: 249.99,
    category: "Accessories",
    image: "watch.jpg",
    rating: 4,
    reviews: 128,
    badge: "Bestseller"
  },
  {
    name: "Wireless Noise-Cancelling Headphones",
    price: 299.00,
    originalPrice: 349.99,
    category: "Electronics",
    image: "headphone.jpg",
    rating: 5,
    reviews: 342,
    badge: "New"
  },
  {
    name: "Premium Sunglasses",
    price: 159.99,
    originalPrice: 199.99,
    category: "Accessories",
    image: "sunglasses.jpg",
    rating: 4.5,
    reviews: 89,
    badge: "Popular"
  },
  {
    name: "Smartwatch Pro",
    price: 399.99,
    originalPrice: 499.99,
    category: "Electronics",
    image: "smartwatch.jpg",
    rating: 4.8,
    reviews: 567,
    badge: "Bestseller"
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // Clear existing products
    await Product.deleteMany({});
    console.log("🗑️ Cleared existing products");

    // Insert sample products
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`✅ Added ${inserted.length} products to database`);
    console.log(inserted);

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

seedProducts();
