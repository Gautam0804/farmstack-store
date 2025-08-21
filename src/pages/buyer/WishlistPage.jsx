import React from "react";
import { useWishlist } from "../../context/WishlistContext"; 
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">❤️ Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="space-y-4">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center p-4 border rounded-lg shadow-sm"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
              <button
                onClick={() => removeFromWishlist(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        {/* ✅ Correct route to ProductsPage */}
        <Link to="/buyer/products" className="text-green-600 hover:underline">
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default WishlistPage;
