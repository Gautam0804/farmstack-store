// pages/seller/Auth.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SellerAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const sellers = JSON.parse(localStorage.getItem("sellers") || "[]");
    const seller = sellers.find((s) => s.email === email && s.password === password);
    if (!seller) {
      setError("Invalid email or password!");
      return;
    }
    localStorage.setItem("loggedSeller", JSON.stringify(seller));
    navigate("/seller/products");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const sellers = JSON.parse(localStorage.getItem("sellers") || "[]");
    const existingSeller = sellers.find((s) => s.email === email);
    if (existingSeller) {
      setError("Email already registered!");
      return;
    }
    const newSeller = { name, email, password };
    sellers.push(newSeller);
    localStorage.setItem("sellers", JSON.stringify(sellers));
    localStorage.setItem("loggedSeller", JSON.stringify(newSeller));
    navigate("/seller/products");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 via-green-50 to-green-200 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        className="relative bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md backdrop-blur-md border border-white/30"
      >
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => { setIsLogin(true); setError(""); }}
            className={`px-6 py-2 font-semibold rounded-t-xl ${
              isLogin ? "bg-green-600 text-white" : "bg-green-100 text-green-700"
            } transition`}
          >
            Login
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(""); }}
            className={`px-6 py-2 font-semibold rounded-t-xl ${
              !isLogin ? "bg-green-600 text-white" : "bg-green-100 text-green-700"
            } transition`}
          >
            Register
          </button>
        </div>

        {error && (
          <p className="text-red-500 mb-4 text-sm text-center font-semibold">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <div className="relative mb-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder=" "
                className="peer w-full p-4 pt-6 rounded-xl border border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none transition"
              />
              <label className="absolute left-4 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-green-600 peer-focus:text-sm">
                Full Name
              </label>
            </div>
          )}

          <div className="relative mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
              className="peer w-full p-4 pt-6 rounded-xl border border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none transition"
            />
            <label className="absolute left-4 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-green-600 peer-focus:text-sm">
              Email
            </label>
          </div>

          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
              className="peer w-full p-4 pt-6 rounded-xl border border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none transition"
            />
            <label className="absolute left-4 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-green-600 peer-focus:text-sm">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-sm text-green-600 hover:text-green-800"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 hover:scale-105 transition-transform shadow-lg"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Animated Blobs */}
        <motion.div
          className="absolute -top-10 -right-10 w-24 h-24 bg-green-300 rounded-full opacity-50 filter blur-2xl animate-pulse"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-400 rounded-full opacity-40 filter blur-3xl animate-pulse"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
      </motion.div>
    </div>
  );
};

export default SellerAuth;
