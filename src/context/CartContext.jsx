import React, { createContext, useContext, useEffect, useState } from "react";

// Create Context
const CartContext = createContext();

// Hook for easy access
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // 🛒 Cart State
  const [cart, setCart] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    // Ensure numericPrice exists in case of reload
    return saved.map((item) => ({
      ...item,
      numericPrice: parseFloat(item.price.toString().match(/[\d.]+/)?.[0] || 0),
    }));
  });

  // ❤️ Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  // 🛒 Add to Cart (auto-increase if already in cart)
  const addToCart = (product) => {
    const numericPrice = parseFloat(product.price.toString().match(/[\d.]+/)?.[0] || 0);
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, numericPrice }];
    });
  };

  // 🛒 Remove from Cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  // 🛒 Increase Quantity
  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // 🛒 Decrease Quantity (auto-remove if qty hits 0)
  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // 🛒 Clear Cart
  const clearCart = () => setCart([]);

  // ❤️ Add / Remove Wishlist
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.filter((item) => item._id !== product._id);
      }
      return [...prev, product];
    });
  };

  // ❤️ Clear Wishlist
  const clearWishlist = () => setWishlist([]);

  // 🛒 Cart Totals
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.numericPrice || 0) * item.quantity,
    0
  );

  // 🔄 Auto Sync with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        toggleWishlist,
        clearWishlist,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
