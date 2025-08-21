import React, { useState, useEffect } from "react";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Form states
  const [editingId, setEditingId] = useState(null);
  const [sellerName, setSellerName] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [locationName, setLocationName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("sellerProducts") || "[]");
    setProducts(saved);
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setSellerName("");
    setName("");
    setPrice("");
    setStock("");
    setLocationName("");
    setDescription("");
    setImage(null);
    setImageURL("");
    setPreview(null);
  };

  // Update preview whenever file or URL changes
  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    } else if (imageURL) {
      setPreview(imageURL);
    } else {
      setPreview(null);
    }
  }, [image, imageURL]);

  const handleUpload = (e) => {
    e.preventDefault();

    if (!sellerName || !name || !price || !stock || !locationName || !description) {
      return alert("Please fill all fields");
    }

    const savedProducts = JSON.parse(localStorage.getItem("sellerProducts") || "[]");

    const saveProduct = (img) => {
      if (editingId) {
        // Edit existing product
        const updatedProducts = savedProducts.map((p) =>
          p._id === editingId
            ? { ...p, sellerName, name, price, stock, location: locationName, description, image: img }
            : p
        );
        localStorage.setItem("sellerProducts", JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
      } else {
        // Add new product
        const newProduct = {
          _id: Date.now(),
          sellerName,
          name,
          price,
          stock,
          location: locationName,
          description,
          image: img,
        };
        const updated = [...savedProducts, newProduct];
        localStorage.setItem("sellerProducts", JSON.stringify(updated));
        setProducts(updated);
      }

      resetForm();
      setShowForm(false);
    };

    // Handle File, URL, or Existing Preview
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        saveProduct(reader.result.toString());
      };
      reader.readAsDataURL(image);
    } else if (imageURL) {
      saveProduct(imageURL);
    } else if (preview) {
      saveProduct(preview);
    } else {
      saveProduct(""); // fallback empty
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setSellerName(product.sellerName);
    setName(product.name);
    setPrice(product.price);
    setStock(product.stock);
    setLocationName(product.location);
    setDescription(product.description);
    setPreview(product.image || null);
    setImage(null);
    setImageURL(product.image || "");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (_id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    const updated = products.filter((p) => p._id !== _id);
    localStorage.setItem("sellerProducts", JSON.stringify(updated));
    setProducts(updated);
  };

  return (
    <div className="min-h-screen p-6 bg-green-50">
      <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">
        Seller Dashboard
      </h1>

      {!showForm && (
        <div className="text-center mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
          >
            Upload New Product
          </button>
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleUpload}
          className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            {editingId ? "Edit Product" : "Upload Product"}
          </h2>

          <input
            type="text"
            placeholder="Seller Name"
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
            className="w-full p-3 mb-3 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-3 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 mb-3 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full p-3 mb-3 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            className="w-full p-3 mb-3 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 mb-3 border rounded resize-none"
            required
          />

          {/* File Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              setImageURL("");
            }}
            className="w-full mb-3"
          />

          {/* Image URL */}
          <input
            type="text"
            placeholder="Or enter image URL"
            value={imageURL}
            onChange={(e) => {
              setImageURL(e.target.value);
              setImage(null);
            }}
            className="w-full p-3 mb-3 border rounded"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mb-3 w-full h-48 object-cover rounded"
            />
          )}

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white p-3 rounded hover:bg-green-700"
            >
              {editingId ? "Save Changes" : "Upload Product"}
            </button>
            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
              className="flex-1 bg-gray-400 text-white p-3 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Product List */}
      <h2 className="text-3xl font-bold text-green-800 mb-4 text-center">My Products</h2>
      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white p-4 rounded-xl shadow flex flex-col hover:shadow-2xl transition transform hover:scale-105"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h2 className="font-bold text-green-800">{p.name}</h2>
              <p>Seller: {p.sellerName}</p>
              <p>Price: {p.price}</p>
              <p>Stock: {p.stock}</p>
              <p>Location: {p.location}</p>
              <p className="text-gray-600">{p.description}</p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="flex-1 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-600"
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

export default SellerDashboard;
