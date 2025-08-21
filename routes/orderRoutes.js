import express from "express";
import { placeOrder } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"; 
const router = express.Router();

// Place an order
router.post("/", authMiddleware, placeOrder);

export default router;
