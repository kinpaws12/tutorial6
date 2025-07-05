const express = require("express");
const Product = require("../models/Product");
const { auth, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

// CREATE
router.post("/", auth, authorizeRoles("admin"), async (req, res) => {
  const product = new Product({ ...req.body, createdBy: req.user.id });
  await product.save();
  res.status(201).json(product);
});

// READ ALL
router.get("/", auth, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// UPDATE
router.put("/:id", auth, authorizeRoles("admin"), async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/:id", auth, authorizeRoles("admin"), async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
