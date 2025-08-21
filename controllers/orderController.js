// controllers/orderController.js
import Order from "../models/Order.js"; // default import
import { Cart } from "../models/Cart.js"; // named import

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's cart and populate product details
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Calculate total
    const total = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    // Create order
    const order = new Order({
      user: userId,
      products: cart.items,
      total,
    });

    await order.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ error: "Server Error" });
  }
};
