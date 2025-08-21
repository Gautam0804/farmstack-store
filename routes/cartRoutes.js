import express from "express";
import { Cart } from "../models/Cart.js";            // ✅ named import
import { Product } from "../models/Product.js";     // ✅ named import
import { authMiddleware } from "../middleware/authMiddleware.js"; // ✅ named import

const router = express.Router();

/**
 * ➕ Add to Cart
 * Body: { productId, quantity }
 */
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find user's cart or create new one
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if product already exists in cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity; // update quantity
    } else {
      cart.items.push({ product: productId, quantity }); // add new product
    }

    await cart.save();
    const updatedCart = await cart.populate("items.product");
    res.json(updatedCart);
  } catch (err) {
    console.error("Error in Add to Cart:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * 🛒 Get Cart for Logged-in User
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    if (!cart) {
      return res.json({ user: req.user.id, items: [] });
    }
    res.json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * ❌ Remove Item from Cart
 */
router.delete("/remove/:productId", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    const updatedCart = await cart.populate("items.product");
    res.json(updatedCart);
  } catch (err) {
    console.error("Error removing item:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * 🔄 Update Quantity
 */
router.put("/update/:productId", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) return res.status(404).json({ message: "Product not in cart" });

    item.quantity = quantity;
    await cart.save();
    const updatedCart = await cart.populate("items.product");
    res.json(updatedCart);
  } catch (err) {
    console.error("Error updating quantity:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
