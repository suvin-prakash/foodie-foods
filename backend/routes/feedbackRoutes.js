const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");


// Save feedback
router.post("/", async (req, res) => {
  const feedback = new Feedback(req.body);
  await feedback.save();
  res.json(feedback);
});


// Get feedback (Admin)
router.get("/", async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  res.json(feedbacks);
});

module.exports = router;