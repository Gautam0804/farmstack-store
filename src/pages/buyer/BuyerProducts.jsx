import React, { useEffect, useState } from "react";
import axios from "axios";

const BuyerProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Available Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p>💰 Price: ₹{p.price}</p>
            <p>📦 Quantity: {p.quantity}</p>
            <p>📍 Location: {p.location}</p>
            <p>👤 Seller: {p.sellerName}</p>
            <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerProducts;
