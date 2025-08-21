import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    setCanSubmit(email.trim() !== "" && password.trim() !== "");
  }, [email, password]);

  const validate = () => {
    let valid = true;
    if (!email.includes("@")) {
      setEmailError("Enter a valid email");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }
    return valid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/buyers/login",
        { email, password }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("loggedBuyer", JSON.stringify(data));
      navigate("/buyer/products");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider) => {
    setLoading(true);
    setTimeout(() => {
      const mockUser = {
        name: provider === "google" ? "Google User" : "Facebook User",
        email:
          provider === "google"
            ? "googleuser@example.com"
            : "facebookuser@example.com",
        provider,
        token: "mock-oauth-token-123",
      };
      localStorage.setItem("token", mockUser.token);
      localStorage.setItem("loggedBuyer", JSON.stringify(mockUser));
      navigate("/buyer/products");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 via-green-50 to-green-200 px-4 relative overflow-hidden">
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 bg-green-300 rounded-full opacity-50 filter blur-2xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-52 h-52 bg-green-400 rounded-full opacity-40 filter blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 7 }}
      />

      <motion.form
        onSubmit={handleLogin}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        className="relative bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-green-100 backdrop-blur-md"
      >
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center drop-shadow-sm">
          Buyer Login
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-sm text-center">{error}</p>
        )}

        {/* Email Input with suggestions */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            list="email-suggestions"
            required
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          {emailError && (
            <p className="text-red-500 text-xs mt-1">{emailError}</p>
          )}
          <datalist id="email-suggestions">
            <option value="@gmail.com" />
            <option value="@yahoo.com" />
            <option value="@outlook.com" />
            <option value="@hotmail.com" />
            <option value="@icloud.com" />
          </datalist>
        </div>

        {/* Password Input */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-sm text-green-600 hover:text-green-800"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {passwordError && (
            <p className="text-red-500 text-xs mt-1">{passwordError}</p>
          )}
        </div>

        <div className="text-right mb-6">
          <Link
            to="/buyer/forgot-password"
            className="text-sm text-green-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={!canSubmit || loading}
          className={`w-full py-3 rounded-xl text-white font-semibold shadow-lg transition-transform flex justify-center items-center gap-2 ${
            !canSubmit || loading
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

        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-gray-400">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

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
          New Buyer?{" "}
          <Link
            to="/buyer/register"
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
