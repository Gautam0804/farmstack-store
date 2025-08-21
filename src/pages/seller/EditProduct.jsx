import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    tags: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  // Load product details for editing
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("sellerProducts") || "[]");
    const prod = saved[id];
    if (prod) {
      setProduct({ ...prod, tags: prod.tags.join(", ") });
      setPreview(prod.image);
    }
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setProduct({ ...product, image: url });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem("sellerProducts") || "[]");
    const updatedProduct = {
      ...product,
      tags: product.tags.split(",").map((t) => t.trim()),
      image: preview,
    };
    saved[id] = updatedProduct;
    localStorage.setItem("sellerProducts", JSON.stringify(saved));
    alert("Product updated successfully!");
    navigate("/seller/my-products");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Edit Product
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={product.tags}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full mb-4 p-2 border rounded-lg"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover mb-4 rounded-lg"
          />
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
