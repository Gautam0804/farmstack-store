import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Heart, SlidersHorizontal } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ProductsPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // Auth guard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/buyer/login");
  }, [navigate]);

  // State
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Load seller products from localStorage
  useEffect(() => {
    const sellerProducts = JSON.parse(localStorage.getItem("sellerProducts") || "[]");
    setProducts(sellerProducts);
  }, []);

  // Debounce search
  useEffect(() => {
    const id = setTimeout(() => setSearchTerm(searchInput.trim()), 300);
    return () => clearTimeout(id);
  }, [searchInput]);

  // Sorting
  const sorted = useMemo(() => {
    const arr = [...products];
    if (sortOption === "lowToHigh") arr.sort((a, b) => a.price - b.price);
    if (sortOption === "highToLow") arr.sort((a, b) => b.price - a.price);
    if (sortOption === "rating") arr.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return arr;
  }, [products, sortOption]);

  // Filtering
  const filtered = useMemo(() => {
    return sorted.filter((p) => {
      const matchesText =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.seller && p.seller.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.location && p.location.toLowerCase().includes(searchTerm.toLowerCase()));

      const priceOk =
        (minPrice === "" || p.price >= Number(minPrice)) &&
        (maxPrice === "" || p.price <= Number(maxPrice));

      return matchesText && priceOk;
    });
  }, [sorted, searchTerm, minPrice, maxPrice]);

  const isInWishlist = (id) => wishlist.some((item) => item._id === id);

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-green-800">
        🌾 Fresh Products
      </h1>

      {/* Controls */}
      <div className="max-w-6xl mx-auto mb-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Search by product, seller, or location..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="flex gap-3">
          <input
            type="number"
            min={0}
            placeholder="Min ₹"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-1/2 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            min={0}
            placeholder="Max ₹"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-1/2 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <SlidersHorizontal className="text-green-700" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="flex-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="default">Sort by</option>
            <option value="lowToHigh">Price: Low → High</option>
            <option value="highToLow">Price: High → Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.length === 0 ? (
          <p className="text-center col-span-4 text-gray-600">No products found.</p>
        ) : (
          filtered.map((p, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
            >
              <div
                className="relative cursor-pointer"
                onClick={() => navigate(`/buyer/product/${index}`, { state: { product: p } })}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-48 object-cover rounded-xl"
                  loading="lazy"
                />
                <button
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    isInWishlist(p._id) ? removeFromWishlist(p._id) : addToWishlist(p);
                  }}
                  aria-label="Toggle favourite"
                >
                  <Heart
                    size={20}
                    className={isInWishlist(p._id) ? "text-red-500 fill-red-500" : "text-gray-400"}
                  />
                </button>
              </div>

              <h2 className="text-lg font-bold mt-3 text-green-800 line-clamp-2">{p.name}</h2>
              {p.seller && <p className="text-gray-600 text-sm">Seller: {p.seller}</p>}
              {p.location && <p className="text-gray-500 text-sm">📍 {p.location}</p>}

              <div className="flex items-center mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < (p.rating || 4) ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>

              <p className="text-xl font-semibold text-green-700 mt-2">₹{p.price}</p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => addToCart(p)}
                  className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg transition-all duration-200 ease-in-out hover:bg-green-700 hover:scale-105 active:scale-95 active:bg-green-800 shadow-md hover:shadow-lg"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => navigate("/checkout", { state: { product: p } })}
                  className="flex-1 bg-orange-500 text-white px-3 py-2 rounded-lg transition-all duration-200 ease-in-out hover:bg-orange-600 hover:scale-105 active:scale-95 active:bg-orange-700 shadow-md hover:shadow-lg"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
