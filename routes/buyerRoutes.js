import express from "express";
import Buyer from "../models/Buyer.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if already exists
    const existing = await Buyer.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Save new buyer
    const buyer = new Buyer({ name, email, password });
    await buyer.save();

    res.status(201).json({ message: "Buyer registered successfully", buyer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const buyer = await Buyer.findOne({ email });
    if (!buyer || buyer.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Login successful", buyer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
