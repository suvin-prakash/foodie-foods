const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
  type: String,
  description: String
});

module.exports = mongoose.model("Menu", MenuSchema);