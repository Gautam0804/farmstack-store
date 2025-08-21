// src/components/ProductCard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingCart, CreditCard } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [favorite, setFavorite] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorite(savedFavorites.includes(product._id));
  }, [product._id]);

  // Toggle favorite & save to localStorage
  const toggleFavorite = (e) => {
    e.stopPropagation();
    setFavorite((prev) => {
      const updated = !prev;
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      let newFavorites;

      if (updated) {
        newFavorites = [...savedFavorites, product._id];
      } else {
        newFavorites = savedFavorites.filter((id) => id !== product._id);
      }

      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return updated;
    });
  };

  // Buy now → add to cart + go to checkout
  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden relative group cursor-pointer hover:shadow-2xl"
    >
      {/* ❤️ Favorite */}
      <button
        onClick={toggleFavorite}
        className={`absolute top-3 right-3 z-10 text-xl p-2 rounded-full transition ${
          favorite ? "text-red-500" : "text-gray-300 hover:text-red-500"
        }`}
      >
        <Heart size={20} />
      </button>

      {/* 🖼️ Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        onClick={() => navigate(`/buyer/product/${product._id}`)}
      />

      {/* 📄 Product Info */}
      <div className="p-4">
        <h3
          className="font-bold text-lg mb-1 hover:text-green-700 cursor-pointer"
          onClick={() => navigate(`/buyer/product/${product._id}`)}
        >
          {product.name}
        </h3>

        {/* ⭐ Rating */}
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < product.rating ? "text-yellow-400" : "text-gray-300"}
            />
          ))}
          <span className="ml-2 text-sm text-gray-500">
            ({product.reviews?.length || 0} reviews)
          </span>
        </div>

        {/* 💰 Price, Seller, Location */}
        <p className="text-green-700 font-semibold mb-2">₹{product.price}</p>
        <p className="text-gray-500 text-sm mb-1">👨‍🌾 Seller: {product.seller}</p>
        <p className="text-gray-500 text-sm mb-2">📍 {product.location}</p>

        {/* 🛒 Actions */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
          >
            <ShoppingCart size={16} /> Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            <CreditCard size={16} /> Buy Now
          </button>
          <button
          onClick={() => addToWishlist(product)}
          className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600"
        >
          ❤️ Wishlist
        </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
