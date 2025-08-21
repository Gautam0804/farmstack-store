import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-green-50 p-6">
      <h2 className="text-3xl font-bold text-green-600 mb-4 text-center">
        ✅ Payment Successful!
      </h2>
      <p className="text-gray-700 mb-6 text-center">
        Your order has been placed successfully.
      </p>
      <button
        onClick={() => navigate("/track")}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition-all"
      >
        Track Your Order
      </button>
    </div>
  );
};

export default SuccessPage;
