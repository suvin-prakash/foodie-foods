const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: Array,
  paymentMethod: String,
  total: Number,
  status: {
    type: String,
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);