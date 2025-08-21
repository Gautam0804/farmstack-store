import express from "express";
import Buyer from "../models/Buyer.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Buyer.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const buyer = new Buyer({ name, email, password });
    await buyer.save();

    res.status(201).json({ message: "Buyer registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const buyer = await Buyer.findOne({ email });
    if (!buyer) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (buyer.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ✅ Optional: generate JWT token
    const token = jwt.sign({ id: buyer._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Login successful", buyer, token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ OAuth Login (Google/Facebook)
router.post("/oauth-login", async (req, res) => {
  try {
    const { email, provider } = req.body; // provider: "google" or "facebook"

    const buyer = await Buyer.findOne({ email });

    if (!buyer) {
      return res.json({ exists: false, message: "Email not registered" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: buyer._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ exists: true, buyer, token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
