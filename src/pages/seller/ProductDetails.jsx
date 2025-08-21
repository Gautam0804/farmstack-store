import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("sellerProducts") || "[]");
    setProduct(saved[id]);
  }, [id]);

  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="min-h-screen bg-green-50 p-6 flex justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-xl mb-4"
        />
        <h2 className="text-2xl font-bold text-green-800 mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-1">Price: ₹{product.price}</p>
        <p className="text-gray-500 mb-1">Stock: {product.stock}</p>
        <p className="text-gray-500 mb-1">Category: {product.category}</p>
        <p className="text-gray-500 mb-1">Tags: {product.tags.join(", ")}</p>
        <p className="text-gray-700 mt-2">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
