import React, { useState } from "react";
import axios from "axios";

const SellerAddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    location: "",
    sellerName: "",
    sellerId: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products/add", form);
      alert("✅ Product added successfully!");
      setForm({ name: "", price: "", quantity: "", location: "", sellerName: "", sellerId: "" });
    } catch (error) {
      alert("❌ Error adding product");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className="w-full p-2 border rounded" required />
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />
        <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" className="w-full p-2 border rounded" required />
        <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded" required />
        <input type="text" name="sellerName" value={form.sellerName} onChange={handleChange} placeholder="Seller Name" className="w-full p-2 border rounded" required />
        <input type="text" name="sellerId" value={form.sellerId} onChange={handleChange} placeholder="Seller ID" className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Upload Product</button>
      </form>
    </div>
  );
};

export default SellerAddProduct;
