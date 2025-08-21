import React, { useState, useEffect } from "react";

const TrackOrderPage = () => {
  const [step, setStep] = useState(0);
  const steps = ["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

  useEffect(() => {
    if (step < steps.length - 1) {
      const timer = setTimeout(() => setStep(step + 1), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg p-6 bg-white rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">🚚 Track Your Order</h2>

        <div className="relative mb-8 h-2 bg-gray-200 rounded-full">
          <div className="absolute top-0 left-0 h-2 bg-green-600 rounded-full transition-all duration-500" style={{ width: `${(step / (steps.length - 1)) * 100}%` }}></div>
        </div>

        <ul className="space-y-4">
          {steps.map((s, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${i <= step ? "bg-green-600 border-green-600 text-white" : "bg-white border-gray-300 text-gray-400"}`}>
                {i <= step ? "✅" : i + 1}
              </span>
              <span className={`font-medium ${i <= step ? "text-green-700" : "text-gray-500"}`}>{s}</span>
            </li>
          ))}
        </ul>

        {step === steps.length - 1 && (
          <p className="mt-6 text-center text-green-800 font-semibold text-lg">🎉 Your order has been delivered!</p>
        )}
      </div>
    </div>
  );
};

export default TrackOrderPage;
