import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paid, setPaid] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const latestOrder = JSON.parse(localStorage.getItem("latestOrder"));
    if (!latestOrder) navigate("/checkout");
    else setOrder(latestOrder);
  }, [navigate]);

  const handlePay = () => {
    if (!paid || !order) return;
    setProcessing(true);
    setTimeout(() => {
      navigate("/payment-success", { state: { order } });
    }, 1500);
  };

  if (!order) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 flex flex-col items-center justify-center p-6">
      {/* Step Indicator */}
      <div className="flex items-center mb-6 space-x-2 text-green-800 font-semibold">
        <span className="px-3 py-1 bg-green-600 text-white rounded-full">1</span>
        <span>Checkout</span>
        <span>→</span>
        <span className="px-3 py-1 bg-green-600 text-white rounded-full">2</span>
        <span>Payment</span>
        <span>→</span>
        <span className="px-3 py-1 bg-gray-400 text-white rounded-full">3</span>
        <span>Success</span>
      </div>

      {/* Payment Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-green-200 w-full max-w-lg"
      >
        <h2 className="text-3xl font-extrabold text-green-900 mb-4 text-center">
          💳 Complete Your Payment
        </h2>

        {/* Order Total */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-center">
          <p className="text-lg font-semibold text-gray-700">Total Payable</p>
          <p className="text-3xl font-extrabold text-green-700">
            ₹{order.total.toFixed(2)}
          </p>
        </div>

        {/* QR Code */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex justify-center mb-6"
        >
          <img
            src="QR.jpg"
            alt="QR Code"
            className="w-64 h-64 object-contain rounded-2xl border-4 border-green-300 shadow-lg"
          />
        </motion.div>

        {/* Buttons */}
        {!paid && (
          <motion.button
            onClick={() => setPaid(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 mb-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition"
          >
            ✅ I Have Paid
          </motion.button>
        )}

        <motion.button
          onClick={handlePay}
          disabled={!paid || processing}
          whileHover={{ scale: paid ? 1.05 : 1 }}
          whileTap={{ scale: paid ? 0.95 : 1 }}
          className={`w-full py-3 rounded-xl font-bold shadow-lg transition-all duration-300 ${
            paid
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {processing ? "⏳ Processing..." : "🚀 Confirm Order"}
        </motion.button>

        {/* Trust Elements */}
        <div className="mt-6 text-sm text-gray-500 text-center space-y-1">
          <p>🔒 100% Secure UPI Payment</p>
          <p>📞 Need help? Contact Support: +91 7091496503</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
