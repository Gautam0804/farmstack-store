import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UploadProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingProduct = location.state?.product || null;

  const [sellerName, setSellerName] = useState(editingProduct?.sellerName || "");
  const [name, setName] = useState(editingProduct?.name || "");
  const [price, setPrice] = useState(editingProduct?.price || "");
  const [stock, setStock] = useState(editingProduct?.stock || "");
  const [locationName, setLocationName] = useState(editingProduct?.location || "");
  const [description, setDescription] = useState(editingProduct?.description || "");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(editingProduct?.image || "");
  const [preview, setPreview] = useState(editingProduct?.image || null);

  // Update preview whenever a file or URL is set
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
    if (!name || !price || !stock || !locationName || !description) {
      return alert("Please fill all fields!");
    }

    const savedProducts = JSON.parse(localStorage.getItem("sellerProducts") || "[]");

    const processAndSave = (imageBase64OrURL) => {
      const productData = {
        _id: editingProduct?._id || Date.now(),
        sellerName,
        name,
        price,
        stock,
        location: locationName,
        description,
        image: imageBase64OrURL || preview,
      };

      if (editingProduct) {
        const updated = savedProducts.map((p) =>
          p._id === editingProduct._id ? productData : p
        );
        localStorage.setItem("sellerProducts", JSON.stringify(updated));
      } else {
        savedProducts.push(productData);
        localStorage.setItem("sellerProducts", JSON.stringify(savedProducts));
      }

      navigate("/seller/my-products");
    };

    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        processAndSave(reader.result.toString());
      };
      reader.readAsDataURL(image);
    } else if (imageURL) {
      processAndSave(imageURL);
    } else {
      processAndSave(null);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-green-50 flex items-center justify-center">
      <form
        onSubmit={handleUpload}
        className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {editingProduct ? "Edit Product" : "Upload Product"}
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

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
            setImageURL(""); // Clear URL if a file is uploaded
          }}
          className="w-full mb-3"
        />

        {/* Image URL input */}
        <input
          type="text"
          placeholder="Or enter image URL"
          value={imageURL}
          onChange={(e) => {
            setImageURL(e.target.value);
            setImage(null); // Clear file if URL is entered
          }}
          className="w-full p-3 mb-3 border rounded"
        />

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mb-3 w-full h-48 object-cover rounded"
          />
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
        >
          {editingProduct ? "Save Changes" : "Upload Product"}
        </button>
      </form>
    </div>
  );
};

export default UploadProduct;
