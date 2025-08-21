import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";

// Buyer pages
import Home from "./pages/Home";
import BuyerLogin from "./pages/buyer/Login";
import BuyerRegister from "./pages/buyer/Register";
import ProductsPage from "./pages/buyer/ProductsPage";
import ProductDetails from "./pages/buyer/ProductDetails";
import CheckoutPage from "./pages/buyer/CheckoutPage";
import CartPage from "./pages/buyer/CartPage";
import WishlistPage from "./pages/buyer/WishlistPage";
import PaymentPage from "./pages/buyer/PaymentPage";
import PaymentSuccessPage from "./pages/buyer/PaymentSuccessPage";

// Seller pages
import SellerDashboard from "./pages/seller/Dashboard";
import SellerLogin from "./pages/seller/Login";
import SellerRegister from "./pages/seller/Register";
import ProductForm from "./pages/seller/ProductForm"; // Upload & Edit
import MyProducts from "./pages/seller/MyProducts";

// Shared pages
import TrackOrderPage from "./pages/TrackOrderPage";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Buyer Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/buyer/login" element={<BuyerLogin />} />
          <Route path="/buyer/register" element={<BuyerRegister />} />
          <Route path="/buyer/products" element={<ProductsPage />} />
          <Route path="/buyer/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />

          {/* Seller Routes */}
          <Route path="/seller/login" element={<SellerLogin />} />
          <Route path="/seller/register" element={<SellerRegister />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/upload-product" element={<ProductForm />} />
          <Route path="/seller/my-products" element={<MyProducts />} />
          <Route path="/seller/edit-product/:id" element={<ProductForm />} />
          <Route path="/seller/product-details/:id" element={<ProductDetails />} />

          {/* Order Flow */}
          <Route path="/track" element={<TrackOrderPage />} />

          {/* Fallback */}
          <Route
            path="*"
            element={
              <h1 className="text-center mt-10 text-red-600">Page Not Found</h1>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
