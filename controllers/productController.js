// controllers/productController.js
import Product from "../models/Product.js"; // ✅ default import

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Server Error" });
  }
};
