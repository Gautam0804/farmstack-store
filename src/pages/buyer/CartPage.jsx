// src/pages/buyer/CartPage.jsx
import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  // pricing: use numericPrice for calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + (Number(item.numericPrice) || 0) * item.quantity,
    0
  );
  const shipping = subtotal === 0 ? 0 : subtotal > 1000 ? 0 : 50;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax - discount;

  // keep discount in sync if quantities change after applying coupon
  useEffect(() => {
    if (coupon.toLowerCase() === "farm10") {
      setDiscount(subtotal * 0.1);
      setCouponMessage("✅ 10% discount applied!");
    } else if (coupon.toLowerCase() === "freeship") {
      setDiscount(50);
      setCouponMessage("✅ Free shipping applied!");
    } else if (coupon) {
      setDiscount(0);
      setCouponMessage("❌ Invalid coupon code.");
    } else {
      setDiscount(0);
      setCouponMessage("");
    }
  }, [subtotal, coupon]);

  const applyCoupon = () => {
    if (!coupon) {
      setCouponMessage("❌ Please enter a coupon.");
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-green-50 flex flex-col md:flex-row md:justify-center gap-6">
      {/* Cart Items */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center md:text-left">
          🛒 Your Cart
        </h2>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              className="w-40 h-40 mb-4 opacity-70"
            />
            <p className="text-gray-600 text-lg font-medium">Your cart is empty.</p>
            <button
              onClick={() => navigate("/buyer/products")}
              className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-4 rounded-2xl shadow-md flex items-center gap-4 relative"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-green-800 font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.seller}</p>
                    <p className="text-green-700 font-semibold mt-1">
                      ₹{item.numericPrice} x {item.quantity} = ₹
                      {(item.numericPrice * item.quantity).toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          item.quantity > 1
                            ? decreaseQuantity(item._id)
                            : removeFromCart(item._id)
                        }
                        className="bg-gray-200 rounded p-2 hover:bg-gray-300 transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="font-semibold min-w-[2ch] text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item._id)}
                        className="bg-gray-200 rounded p-2 hover:bg-gray-300 transition"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() =>
                      window.confirm("Remove this item?") && removeFromCart(item._id)
                    }
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                    aria-label="Remove item"
                  >
                    <X size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Checkout Summary */}
      {cart.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6 w-full md:w-1/3 h-fit sticky top-20 self-start">
          <h3 className="text-xl font-bold text-green-700 mb-4">Order Summary</h3>

          <div className="flex justify-between mb-2 text-gray-700">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 text-gray-700">
            <span>Shipping:</span>
            <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between mb-2 text-gray-700">
            <span>Tax (5%):</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between mb-2 text-green-600 font-semibold">
              <span>Discount:</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-green-700 text-lg border-t pt-2 mt-2">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          {/* Coupon */}
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter Coupon Code"
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={applyCoupon}
              className="bg-green-600 text-white px-4 rounded-lg flex items-center gap-1 hover:bg-green-700"
            >
              <Gift size={16} /> Apply
            </button>
          </div>
          {couponMessage && (
            <p
              className={`mt-2 text-sm ${
                couponMessage.includes("✅") ? "text-green-600" : "text-red-500"
              }`}
            >
              {couponMessage}
            </p>
          )}

          {/* Actions */}
          <button
            onClick={() => navigate("/checkout", { state: { cart } })}
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-semibold"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={() => window.confirm("Clear entire cart?") && clearCart()}
            className="w-full mt-3 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition font-semibold"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
