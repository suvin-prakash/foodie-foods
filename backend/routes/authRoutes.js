const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Staff = require("../models/Staff");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "restaurant_secret_key";


/* SIGNUP */

router.post("/signup", async (req, res) => {
  try {

    const { username, phone, password } = req.body;

    if (!username || !phone || !password) {
      return res.status(400).json({
        message: "All fields required"
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      phone,
      password: hashedPassword,
      role: "user"
    });

    await user.save();

    res.json({
      message: "Signup successful"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

/* LOGIN */

router.post("/login", async (req, res) => {

  const { username, password } = req.body;

  const user = await User.findOne({
    $or: [{ username: username }, { phone: username }]
  });

  if (!user) {
    return res.json({ message: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role
    },
    SECRET_KEY,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: {
      username: user.username,
      role: user.role
    }
  });

});


//staff login
router.get("/staff-login", (req, res) => {
    res.send("Staff Route Working");
});

router.post("/staff-login", async (req, res) => {

  const { staffId, password } = req.body;

  const staff = await Staff.findOne({ staffId });

  if (!staff) {
    return res.json({ message: "Staff not found" });
  }

  if (staff.password !== password) {
    return res.json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    {
      name: staff.staffName,
      id: staff._id,
      role: "staff"
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );

  res.json({
    token,
    user: {
      username: staff.staffName,
      role: "staff"
    }
  });

});

module.exports = router;