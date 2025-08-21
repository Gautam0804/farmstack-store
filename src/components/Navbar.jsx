import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react"; // Cart + Wishlist icons
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const location = useLocation();
  const { totalQuantity, wishlist } = useCart(); // ✅ get live values from context

  const linkClasses = (path) =>
    `px-3 py-2 rounded-md transition-colors ${
      location.pathname === path
        ? "bg-white text-green-700 font-semibold"
        : "text-white hover:bg-white hover:text-green-700"
    }`;

  return (
    <nav className="bg-green-600 shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-600 font-bold text-lg">
          FS
        </div>
        <span className="text-white font-bold text-2xl">FarmStack</span>
      </Link>

      {/* Links */}
      <div className="flex items-center space-x-6">
        <Link to="/" className={linkClasses("/")}>
          Home
        </Link>
        <Link to="/dashboard" className={linkClasses("/dashboard")}>
          Dashboard
        </Link>

        {/* Wishlist with badge */}
        <Link to="/wishlist" className="relative text-white hover:text-green-200 transition">
          <Heart className="w-6 h-6" />
          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {wishlist.length}
            </span>
          )}
        </Link>

        {/* Cart with badge */}
        <Link to="/cart" className="relative text-white hover:text-green-200 transition">
          <ShoppingCart className="w-6 h-6" />
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalQuantity}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
