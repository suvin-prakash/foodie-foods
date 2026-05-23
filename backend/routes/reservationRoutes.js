const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");


// Save reservation
router.post("/", async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get all reservations (for admin page)
router.get("/", async (req, res) => {
  const reservations = await Reservation.find();
  res.json(reservations);
});

module.exports = router;