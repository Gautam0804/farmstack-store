import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // for editing
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (id !== undefined) {
      const saved = JSON.parse(localStorage.getItem("sellerProducts") || "[]");
      const product = saved[id];
      if (product) {
        setName(product.name);
        setPrice(product.price);
        setStock(product.stock);
        setImage(product.image);
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !stock || !image) return alert("All fields are required!");

    const saved = JSON.parse(localStorage.getItem("sellerProducts") || "[]");

    const newProduct = { name, price, stock, image };

    if (id !== undefined) {
      // Edit existing
      saved[id] = newProduct;
    } else {
      // Add new
      saved.push(newProduct);
    }

    localStorage.setItem("sellerProducts", JSON.stringify(saved));
    navigate("/seller/my-products");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          {id !== undefined ? "Edit Product" : "Upload Product"}
        </h2>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border rounded-xl"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 mb-4 border rounded-xl"
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full p-3 mb-4 border rounded-xl"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-3 mb-6 border rounded-xl"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
        >
          {id !== undefined ? "Update Product" : "Upload Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
