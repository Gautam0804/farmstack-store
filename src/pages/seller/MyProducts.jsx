import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("sellerProducts") || "[]");
    setProducts(saved);
  }, []);

  const handleDelete = (_id) => {
    if (!window.confirm("Delete this product?")) return;
    const updated = products.filter((p) => p._id !== _id);
    setProducts(updated);
    localStorage.setItem("sellerProducts", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-green-50 to-green-100">
      <h1 className="text-4xl font-extrabold text-green-900 mb-8 text-center">
        My Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No products uploaded yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 flex flex-col"
            >
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-48 object-cover rounded-xl mb-3"
                />
                <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded shadow">
                  ₹{p.price}/kg
                </span>
                <span
                  className={`absolute top-2 right-2 text-white text-xs font-semibold px-2 py-1 rounded shadow ${
                    p.stock > 0 ? "bg-blue-600" : "bg-red-600"
                  }`}
                >
                  {p.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <h2 className="font-bold text-xl text-green-900 mb-1">{p.name}</h2>
              <p className="text-gray-700 mb-1">Seller: {p.sellerName}</p>
              <p className="text-gray-700 mb-1">Location: {p.location}</p>
              <p className="text-gray-500 mb-3 text-sm line-clamp-3">
                {p.description}
              </p>

              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() =>
                    navigate("/seller/upload-product", { state: { product: p } })
                  }
                  className="flex-1 bg-yellow-500 text-white p-2 rounded-xl hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex-1 bg-red-500 text-white p-2 rounded-xl hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
