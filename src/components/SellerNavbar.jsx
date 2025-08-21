import React from "react";
import { Link } from "react-router-dom";

const SellerNavbar = () => {
  return (
    <nav className="bg-green-700 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">FarmStack Seller</h1>
      <div className="space-x-4">
        <Link to="/seller/dashboard" className="hover:text-lime-300">Dashboard</Link>
        <Link to="/seller/products" className="hover:text-lime-300">Upload Product</Link>
        <Link to="/seller/profile" className="hover:text-lime-300">Profile</Link>
        <Link to="/seller/login" className="hover:text-lime-300">Logout</Link>
      </div>
    </nav>
  );
};

export default SellerNavbar;
