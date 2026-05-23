const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  staffId: String,
  staffName: String,
  password: String,
  role: {
    type: String,
    default: "staff"
  }
});

module.exports = mongoose.model("Staff", staffSchema);