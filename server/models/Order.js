const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name: String,
  image: String,
  price: Number,
  quantity: Number,
});

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [OrderItemSchema],
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["pending", "processing", "delivered", "cancelled"], 
    default: "pending" 
  },
  shippingAddress: {
    name: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Order", OrderSchema);