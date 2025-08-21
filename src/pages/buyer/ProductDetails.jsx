// pages/buyer/ProductDetails.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Star, ChevronLeft } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [product, setProduct] = useState(location.state?.product || null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ user: "", rating: 0, comment: "" });
  const [showFullDesc, setShowFullDesc] = useState(false);

  // Fetch product if navigating directly or refreshing
  useEffect(() => {
    if (!product) {
      const products = JSON.parse(localStorage.getItem("sellerProducts") || "[]");
      const idToFind = productId || location.state?.product?._id;
      const found = products.find((p) => p._id === Number(idToFind));
      if (found) setProduct(found);
      else navigate("/buyer/products");
    }
  }, [product, navigate, location.state, productId]);

  const isInWishlist = (id) => wishlist.some((item) => item._id === id);

  // Calculate average rating
  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const handleReviewSubmit = () => {
    if (!newReview.user || !newReview.comment || newReview.rating === 0) return;
    setReviews([...reviews, { ...newReview, id: Date.now() }]);
    setNewReview({ user: "", rating: 0, comment: "" });
  };

  if (!product) return null;

  // Convert price string like "60/kg" into numeric
  const numericPrice = parseFloat(product.price.replace(/[^\d.]/g, "")) || 0;

  return (
    <div className="min-h-screen bg-green-50 p-6">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-green-600 hover:underline gap-1"
        >
          <ChevronLeft size={18} /> Back to Products
        </button>
      </div>

      {/* Product Details */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left: Image */}
        <div className="md:w-1/2 p-4 flex flex-col gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right: Details */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-1">Seller: {product.seller || "N/A"}</p>
            <p className="text-gray-500 mb-3">📍 {product.location || "N/A"}</p>
            {product.stock !== undefined && (
              <p className={`mb-2 font-medium ${product.stock > 0 ? "text-green-700" : "text-red-500"}`}>
                Stock: {product.stock > 0 ? `${product.stock} available` : "Out of Stock"}
              </p>
            )}

            {/* Ratings */}
            <div className="flex items-center gap-2 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < Math.round(avgRating) ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
              <span className="text-gray-600 font-medium">{avgRating} / 5 ({reviews.length} reviews)</span>
            </div>

            {/* Description */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-green-800 mb-2">📝 Description</h2>
              <p className={`text-gray-700 mb-2 transition-all ${showFullDesc ? "" : "line-clamp-6"}`}>
                {product.description || "No description available."}
              </p>
              {product.description && product.description.length > 200 && (
                <button
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="text-green-600 hover:underline font-medium"
                >
                  {showFullDesc ? "Show Less" : "Read More"}
                </button>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-4">
            <p className="text-2xl font-bold text-green-700">₹{product.price}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => addToCart({ ...product, numericPrice })}
                className="flex-1 bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition shadow-md hover:shadow-lg"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  const buyNowProduct = { ...product, numericPrice, quantity: 1 };
                  navigate("/checkout", { state: { cart: [buyNowProduct] } });
                }}
                className="flex-1 bg-orange-500 text-white px-4 py-3 rounded-xl hover:bg-orange-600 transition shadow-md hover:shadow-lg"
              >
                Buy Now
              </button>

              <button
                onClick={() =>
                  isInWishlist(product._id)
                    ? removeFromWishlist(product._id)
                    : addToWishlist(product)
                }
                className={`flex-1 px-4 py-3 rounded-xl border transition shadow-md hover:shadow-lg ${
                  isInWishlist(product._id)
                    ? "bg-red-500 text-white border-red-500 hover:bg-red-600"
                    : "bg-white text-green-600 border-green-600 hover:bg-green-50"
                }`}
              >
                {isInWishlist(product._id) ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-6xl mx-auto mt-8 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-green-800 mb-4">✅ Satisfied Customers</h2>

        {/* Add Review */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Leave a Review</h3>
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.user}
            onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={24}
                className={`cursor-pointer ${i < newReview.rating ? "text-yellow-400" : "text-gray-300"}`}
                onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
              />
            ))}
          </div>
          <textarea
            placeholder="Write your review"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <button
            onClick={handleReviewSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Submit Review
          </button>
        </div>

        {/* Display Reviews */}
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="border-b pb-2">
                <div className="flex items-center gap-2 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < r.rating ? "text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                  <span className="font-medium text-gray-700">{r.user}</span>
                </div>
                <p className="text-gray-600">{r.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
