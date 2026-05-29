const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  originalPrice: Number,
  category: String,
  image: String,
  rating: Number,
  reviews: Number,
  badge: String,
});

module.exports = mongoose.model("Product", ProductSchema);
