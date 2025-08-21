// routes/sellerRoutes.js
import express from "express";
import Seller from "../models/Seller.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Seller Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // check if seller exists
    const existing = await Seller.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Seller already exists" });
    }

    // create seller
    const seller = await Seller.create({ name, email, password });

    // create token
    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ seller, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Seller Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await seller.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // create token
    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ seller, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
