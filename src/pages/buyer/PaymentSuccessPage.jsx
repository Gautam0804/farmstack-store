import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Truck, Package, Home, Clock } from "lucide-react";

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;
  const [statusIndex, setStatusIndex] = useState(0);

  // Timeline statuses with icons
  const statuses = [
    { label: "Order Placed", icon: Clock },
    { label: "Processing", icon: Package },
    { label: "Shipped", icon: Truck },
    { label: "Out for Delivery", icon: Truck },
    { label: "Delivered", icon: Home },
  ];

  useEffect(() => {
    if (!order) navigate("/checkout"); // redirect if no order
  }, [order, navigate]);

  if (!order) return null;

  const advanceStatus = () => {
    if (statusIndex < statuses.length - 1) {
      setStatusIndex(statusIndex + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-50 to-green-100 space-y-6">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <CheckCircle className="w-20 h-20 text-green-600" />
      </motion.div>

      <h1 className="text-4xl font-extrabold text-green-800 text-center">
        🎉 Payment Successful!
      </h1>
      <p className="text-lg text-gray-700 text-center">
        Thank you, <span className="font-bold">{order.customer.name}</span>
      </p>
      <p className="text-lg font-semibold text-green-700">
        Total Paid: ₹{order.total.toFixed(2)}
      </p>

      {/* Order Details */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-lg border border-green-200 w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold text-green-800 mb-3">
          🛍 Order Summary
        </h2>
        <ul className="divide-y divide-green-100 mb-4">
          {order.items.map((item) => (
            <li key={item._id} className="flex justify-between py-2 text-gray-700">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span className="font-semibold">
                ₹{(item.numericPrice * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>

        <div className="border-t pt-3 space-y-1 text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>{order.shipping === 0 ? "Free" : `₹${order.shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax:</span>
            <span>₹{order.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-green-700">
            <span>Total:</span>
            <span>₹{order.total.toFixed(2)}</span>
          </div>
        </div>
      </motion.div>

      {/* Order Tracking */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-green-200 w-full max-w-2xl"
      >
        <h2 className="text-xl font-bold mb-3 text-green-800">
          🚚 Track Your Order
        </h2>
        <ul className="space-y-3">
          {statuses.map((status, i) => {
            const Icon = status.icon;
            return (
              <li
                key={i}
                className={`flex items-center gap-3 ${
                  i <= statusIndex ? "text-green-700 font-semibold" : "text-gray-400"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 border-green-600 ${
                    i <= statusIndex ? "bg-green-600 text-white" : ""
                  }`}
                >
                  <Icon size={18} />
                </span>
                {status.label}
              </li>
            );
          })}
        </ul>

        {/* Advance Status Button */}
        <motion.button
          whileHover={{ scale: statusIndex < statuses.length - 1 ? 1.05 : 1 }}
          whileTap={{ scale: statusIndex < statuses.length - 1 ? 0.95 : 1 }}
          onClick={advanceStatus}
          className={`mt-6 w-full py-3 rounded-xl font-bold shadow-md transition-all duration-300 ${
            statusIndex < statuses.length - 1
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
          disabled={statusIndex >= statuses.length - 1}
        >
          {statusIndex < statuses.length - 1 ? "Advance Status" : "✅ Order Delivered"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;
