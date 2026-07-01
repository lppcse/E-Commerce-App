import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { CartItem, CartContextType } from "../types";
import { useAuth } from "./AuthContext";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [guestId, setGuestId] = useState<string>("");

  // Keep a ref to user to avoid dependency loop or stale values
  const userRef = useRef(user);
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  // Establish stable Guest ID if not logged in
  useEffect(() => {
    let id = localStorage.getItem("aura_guest_id");
    if (!id) {
      id = "guest_" + Math.random().toString(36).substring(2, 11);
      localStorage.setItem("aura_guest_id", id);
    }
    setGuestId(id);
  }, []);

  // Determine active identifier (logged-in email or guest id)
  const getActiveUserId = (): string => {
    return userRef.current ? userRef.current.email : (guestId || localStorage.getItem("aura_guest_id") || "guest_default");
  };

  // Fetch cart items from REST API
  const fetchCart = async () => {
    const userId = getActiveUserId();
    if (!userId) return;

    try {
      const response = await fetch(`/api/cart/${encodeURIComponent(userId)}`);
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      }
    } catch (e) {
      console.error("Error fetching cart from REST API:", e);
    } finally {
      setLoading(false);
    }
  };

  // Sync cart when active user changes or guestId is resolved
  useEffect(() => {
    if (guestId || user) {
      fetchCart();
    }
  }, [user, guestId]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    const userId = getActiveUserId();
    try {
      const response = await fetch(`/api/cart/${encodeURIComponent(userId)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      }
    } catch (e) {
      console.error("Error adding to cart:", e);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    const userId = getActiveUserId();
    try {
      const response = await fetch(`/api/cart/${encodeURIComponent(userId)}/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      }
    } catch (e) {
      console.error("Error updating cart quantity:", e);
    }
  };

  const removeFromCart = async (productId: string) => {
    const userId = getActiveUserId();
    try {
      const response = await fetch(`/api/cart/${encodeURIComponent(userId)}/${productId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      }
    } catch (e) {
      console.error("Error removing from cart:", e);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
