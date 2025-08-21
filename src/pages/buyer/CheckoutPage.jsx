import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Accept either a single product (Buy Now) or cart
  const productsFromState = location.state?.cart || location.state?.product;
  const initialCart = Array.isArray(productsFromState)
    ? productsFromState
    : productsFromState
    ? [productsFromState]
    : JSON.parse(localStorage.getItem("latestCart")) || [];

  // ✅ Normalize cart items
  const normalizeCart = (items) =>
    items.map((item) => {
      const priceNumber = parseFloat(
        (item.numericPrice ?? item.price ?? "0").toString().replace(/[^\d.]/g, "")
      );
      return {
        ...item,
        quantity: item.quantity || 1,
        numericPrice: isNaN(priceNumber) ? 0 : priceNumber,
      };
    });

  const [cart, setCart] = useState(normalizeCart(initialCart));
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    zip: "",
    phone: "",
  });

  // Save cart so refresh doesn’t lose data
  useEffect(() => {
    localStorage.setItem("latestCart", JSON.stringify(cart));
  }, [cart]);

  // If no product
  if (!cart || cart.length === 0)
    return <p className="text-center mt-10">⚠️ No product selected.</p>;

  // 🧮 Calculations
  const subtotal = cart.reduce(
    (acc, item) => acc + item.numericPrice * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 50 : 0; // shipping only if items exist
  const tax = subtotal * 0.1; // 10% tax on subtotal only
  const grandTotal = subtotal + shipping + tax;

  const isFormValid = Object.values(formData).every((val) => val.trim() !== "");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const updateQuantity = (id, value) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, value) } : item
      )
    );
  };

  const handleProceed = (e) => {
    e.preventDefault();
    const orderInfo = {
      customer: formData,
      items: cart,
      subtotal,
      shipping,
      tax,
      total: grandTotal,
    };
    localStorage.setItem("latestOrder", JSON.stringify(orderInfo));
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center p-4 space-y-6">
      <h1 className="text-4xl font-extrabold text-green-800">🛒 Checkout</h1>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shipping Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-3xl shadow-xl border border-green-200"
        >
          <h2 className="text-2xl font-bold mb-4 text-green-700">
            Shipping & Contact Info
          </h2>
          <form onSubmit={handleProceed} className="space-y-4">
            {["name", "address", "zip", "phone"].map((field) => (
              <input
                key={field}
                type={field === "phone" ? "tel" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            ))}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={!isFormValid}
              className={`w-full py-3 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 ${
                isFormValid
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Proceed to Payment
            </motion.button>
          </form>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-3xl shadow-xl border border-green-200"
        >
          <h2 className="text-2xl font-bold mb-4 text-green-700">
            Order Summary
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-500">
                    ₹{item.numericPrice} × {item.quantity} = ₹
                    {(item.numericPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item._id, Number(e.target.value))
                  }
                  className="w-16 p-1 border rounded text-center"
                />
              </div>
            ))}
          </div>
          <hr className="my-4 border-green-200" />

          {/* 🧾 Totals */}
          <div className="space-y-2 text-green-800">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;
