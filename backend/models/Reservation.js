const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: String,
  time: String,
  guests: String,
  request: String,
});

module.exports = mongoose.model("Reservation", reservationSchema);