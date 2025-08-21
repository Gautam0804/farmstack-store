import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Both fields are required");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/sellers/login",
        { email, password }
      );

      localStorage.setItem("loggedSeller", JSON.stringify(data));
      navigate("/seller/dashboard"); // ✅ corrected route
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  const checkPasswordStrength = (pass) => {
    if (!pass) return "";
    if (pass.length < 6) return "Weak";
    if (pass.match(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/)) return "Strong";
    return "Medium";
  };

  const handleOAuthLogin = (provider) => {
    setLoading(true);
    setTimeout(() => {
      const mockUser = {
        name: provider === "google" ? "Google Seller" : "Facebook Seller",
        email:
          provider === "google"
            ? "google_seller@example.com"
            : "facebook_seller@example.com",
        provider,
        token: "mock-oauth-token-123",
      };
      localStorage.setItem("loggedSeller", JSON.stringify(mockUser));
      navigate("/seller/dashboard"); // ✅ corrected route
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 via-green-50 to-green-200 px-4 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute -top-32 -right-32 w-60 h-60 bg-green-300 rounded-full opacity-50 filter blur-3xl"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 7 }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-72 h-72 bg-green-400 rounded-full opacity-40 filter blur-4xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-200 rounded-full opacity-30 filter blur-2xl -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 9 }}
      />

      <motion.form
        onSubmit={handleLogin}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        className="relative bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-green-100 backdrop-blur-md"
      >
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center drop-shadow-sm">
          Seller Login
        </h2>

        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}

        {/* Email Input */}
        <div className="relative mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=" "
            className="peer w-full p-4 pt-6 rounded-xl border border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none transition"
          />
          <label className="absolute left-4 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-green-600 peer-focus:text-sm">
            Email
          </label>
        </div>

        {/* Password Input */}
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordStrength(checkPasswordStrength(e.target.value));
            }}
            required
            placeholder=" "
            className="peer w-full p-4 pt-6 rounded-xl border border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none transition"
          />
          <label className="absolute left-4 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-green-600 peer-focus:text-sm">
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

        {password && (
          <p
            className={`text-sm mb-4 ${
              passwordStrength === "Weak"
                ? "text-red-500"
                : passwordStrength === "Medium"
                ? "text-yellow-500"
                : "text-green-600"
            }`}
          >
            Password Strength: {passwordStrength}
          </p>
        )}

        {/* Forgot Password */}
        <div className="text-right mb-6">
          <Link
            to="/seller/forgot-password"
            className="text-sm text-green-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold shadow-lg transition-transform flex justify-center items-center gap-2 ${
            loading
              ? "bg-green-400 opacity-70 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 hover:scale-105"
          }`}
        >
          {loading ? (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
          ) : (
            "Login"
          )}
        </button>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-gray-400">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* OAuth Buttons */}
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => handleOAuthLogin("google")}
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 py-2 rounded-xl hover:bg-gray-100 transition"
          >
            <FcGoogle size={18} /> Login with Google
          </button>
          <button
            type="button"
            onClick={() => handleOAuthLogin("facebook")}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            <FaFacebookF size={18} /> Login with Facebook
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-600 text-center">
          New Seller?{" "}
          <Link
            to="/seller/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
