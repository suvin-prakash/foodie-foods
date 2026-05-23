const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static("public/images"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => console.log("MongoDB Error:", err));

app.get("/", (req, res) => {
  res.send("Restaurant API Running");
  
});

app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));


app.listen(5000, () => {
  console.log("Server running on port 5000");
});