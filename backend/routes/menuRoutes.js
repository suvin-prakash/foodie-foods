const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");
const multer = require("multer");

/*ADD Storage*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* GET all menu items */
router.get("/", async (req, res) => {
  const items = await Menu.find();
  res.json(items);
});

/* ADD new menu item (Admin) */
router.post("/", upload.single("image"), async (req, res) => {
  const item = new Menu({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    type: req.body.type,
    description: req.body.description,
    image: "/images/" + req.file.filename,
  });

  await item.save();

  res.json(item);
});

/* DELETE menu item */
router.delete("/:id", async (req, res) => {
  await Menu.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
});

module.exports = router;
