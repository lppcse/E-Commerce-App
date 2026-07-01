import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Trash2, ShoppingBag, ArrowLeft, CreditCard, ShieldCheck, CheckCircle2, Package, Loader2, Sparkles, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const Cart: React.FC = () => {
  const { cart, loading, updateQuantity, removeFromCart, clearCart, cartTotal, cartCount } = useCart();
  const { user } = useAuth();
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const FREE_SHIPPING_THRESHOLD = 200;
  const shippingCost = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 15;
  const grandTotal = cartTotal + shippingCost;

  const handleCheckout = () => {
    setCheckingOut(true);
    // Simulate API delay for order creation
    setTimeout(() => {
      const generatedOrderId = "AURA-" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedOrderId);
      setCheckingOut(false);
      setCheckoutComplete(true);
      clearCart();
    }, 2000);
  };

  // Checkout Success Screen
  if (checkoutComplete) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 min-h-screen text-center flex flex-col items-center justify-center bg-white">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-4 bg-emerald-50 text-emerald-600 rounded-full mb-6"
        >
          <CheckCircle2 className="h-16 w-16" />
        </motion.div>

        <h1 className="text-3xl font-extrabold text-gray-950 font-sans tracking-tight mb-2">Order Confirmed</h1>
        <p className="text-sm text-gray-500 mb-8 max-w-sm">
          Thank you for shopping with Aura Studio! Your workspace transformation has officially begun.
        </p>

        {/* Invoice details block */}
        <div className="w-full bg-neutral-50 rounded-2xl border border-gray-100 p-6 text-left space-y-4 mb-8">
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order Reference</span>
            <span className="text-sm font-mono font-bold text-gray-800">{orderId}</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-xs text-gray-600">
              <Package className="h-4 w-4 text-neutral-400 mr-2" />
              <span>Status: <strong className="text-amber-600 font-bold uppercase text-xxs bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50 ml-1">REST API Queue Syncing</strong></span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <ShieldCheck className="h-4 w-4 text-neutral-400 mr-2" />
              <span>Secure Warranty: <strong>2-Years Active</strong></span>
            </div>
            <div className="text-xs text-gray-400 pl-6 leading-relaxed">
              We have dispatched a receipt and assembly instructions to {user?.email || "your email"}.
            </div>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center px-6 py-3.5 bg-neutral-900 text-white font-semibold text-sm rounded-xl hover:bg-neutral-800 transition"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Return to Storefront
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen bg-white text-left" id="cart-page">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 font-sans mb-2" id="cart-title">
        Your Cart
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Review your premium designer essentials. Items synchronized with Express session tables.
      </p>

      {loading ? (
        <div className="py-24 text-center">
          <Loader2 className="h-10 w-10 text-neutral-900 animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500">Querying active user session cart details...</p>
        </div>
      ) : cart.length === 0 ? (
        <div className="py-24 text-center space-y-4 max-w-sm mx-auto">
          <div className="p-4 bg-gray-50 text-gray-400 rounded-full inline-block">
            <ShoppingBag className="h-12 w-12" />
          </div>
          <h2 className="text-xl font-bold text-gray-950 font-sans">Your Cart is Empty</h2>
          <p className="text-sm text-gray-500">
            You have not added any designer workspace items to your queue yet.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 bg-neutral-900 text-white text-sm font-semibold rounded-xl hover:bg-neutral-800 transition"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Cart Item list table */}
          <div className="lg:col-span-8 space-y-4" id="cart-items-list">
            {/* Shipping promotion bar */}
            <div className="bg-neutral-50 rounded-2xl border border-gray-100 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span className="text-xs font-semibold text-gray-700">
                  {cartTotal >= FREE_SHIPPING_THRESHOLD
                    ? "🎉 Congratulations! You have unlocked complimentary courier shipping."
                    : `Add $${(FREE_SHIPPING_THRESHOLD - cartTotal).toFixed(2)} more to unlock complimentary shipping.`}
                </span>
              </div>
              <span className="text-xxs font-mono font-bold text-neutral-400">THRESHOLD: $200.00</span>
            </div>

            {/* Items map */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.product.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white gap-4">
                  {/* Thumbnail and Title */}
                  <div className="flex items-center space-x-4 min-w-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-20 w-20 rounded-xl object-cover bg-gray-50 border border-gray-100"
                    />
                    <div className="min-w-0">
                      <Link to={`/shop/${item.product.id}`} className="hover:text-amber-600 transition">
                        <h3 className="font-bold text-gray-950 font-sans text-sm truncate max-w-64 sm:max-w-xs">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">${item.product.price.toFixed(2)} each</p>
                    </div>
                  </div>

                  {/* Quantity control and Subtotal */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-8">
                    {/* Quantity selectors */}
                    <div className="flex items-center border border-gray-200 rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 text-gray-500 hover:text-neutral-900 hover:bg-neutral-50 rounded"
                        aria-label="Decrease"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold font-mono text-gray-800 min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 text-gray-500 hover:text-neutral-900 hover:bg-neutral-50 rounded"
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>

                    {/* Total price & Trash */}
                    <div className="text-right min-w-24">
                      <p className="text-sm font-extrabold text-neutral-950 font-mono">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-xxs text-red-400 hover:text-red-600 font-semibold inline-flex items-center space-x-0.5 mt-1 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Summary panel */}
          <div className="lg:col-span-4" id="cart-summary-panel">
            <div className="bg-neutral-50 rounded-2xl border border-gray-100 p-6 space-y-6">
              <h2 className="text-base font-bold text-gray-950 font-sans tracking-tight border-b border-gray-200 pb-3">
                Order Summary
              </h2>

              <div className="space-y-3.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Cart Items Count</span>
                  <span className="font-semibold font-mono text-gray-800">{cartCount} items</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold font-mono text-gray-800">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Delivery</span>
                  <span className="font-semibold text-gray-800">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase text-xxs">FREE</span>
                    ) : (
                      <span className="font-mono">${shippingCost.toFixed(2)}</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between items-baseline">
                <span className="text-sm font-bold text-gray-900">Grand Total</span>
                <span className="text-2xl font-black text-neutral-900 font-mono">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-3 pt-2">
                {checkingOut ? (
                  <button
                    disabled
                    className="w-full flex items-center justify-center space-x-2 py-3.5 bg-neutral-900 text-white text-sm font-semibold rounded-xl"
                  >
                    <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
                    <span>Processing Order...</span>
                  </button>
                ) : (
                  <button
                    onClick={handleCheckout}
                    className="w-full flex items-center justify-center space-x-2 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold rounded-xl transition shadow-md cursor-pointer"
                    id="checkout-proceed-btn"
                  >
                    <CreditCard className="h-4 w-4 text-amber-300" />
                    <span>Proceed to Checkout</span>
                  </button>
                )}

                <p className="text-xxs text-neutral-400 text-center leading-relaxed">
                  Authentication synced via secure Google callback. Complete warranty active on checkout execution.
                </p>
              </div>

              {/* Auth Warning prompt */}
              {!user && (
                <div className="flex items-start space-x-2 p-3 bg-amber-50 border border-amber-200/50 rounded-xl text-amber-700 text-xxs leading-relaxed">
                  <Info className="h-4 w-4 flex-shrink-0 text-amber-600 mt-0.5" />
                  <span>
                    You are checking out as a <strong>Guest</strong>. Sign in using your Google account to automatically store purchase records in your profiles dashboard.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
