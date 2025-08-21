import express from "express";
// import Razorpay from "razorpay"; // Comment this out for testing
// import crypto from "crypto";

const router = express.Router();

// ----------------- MOCK for local testing -----------------
router.post("/create-order", async (req, res) => {
  const { amount, currency = "INR", receipt } = req.body;

  // Mock response similar to Razorpay
  const order = {
    id: `order_${Date.now()}`,
    amount: amount * 100,
    currency,
    receipt: receipt || `receipt_${Date.now()}`,
    status: "created",
  };

  res.status(200).json(order);
});

router.post("/verify", (req, res) => {
  // Always return success for testing
  res.status(200).json({
    success: true,
    message: "Payment verified successfully (mocked)",
  });
});
// ------------------------------------------------------------

export default router;
