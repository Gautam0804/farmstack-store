// controllers/cartController.js
import { Cart } from "../models/Cart.js"; // ✅ named import

// Add product to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity; // update quantity
    } else {
      cart.items.push({ product: productId, quantity }); // add new item
    }

    await cart.save();
    const updatedCart = await cart.populate("items.product");
    res.status(200).json(updatedCart);
  } catch (err) {
    console.error("Error in addToCart:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get cart for logged-in user
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );

    if (!cart) {
      return res.status(200).json({ user: req.user.id, items: [] });
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error("Error in getCart:", err);
    res.status(500).json({ error: "Server Error" });
  }
};
