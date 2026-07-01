import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Product } from "../types";
import { useCart } from "../context/CartContext";
import { ArrowLeft, Star, Plus, Minus, ShoppingCart, ShieldCheck, Truck, RotateCcw, AlertTriangle, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export const PDP: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);
  const [recommended, setRecommended] = useState<Product[]>([]);

  const fetchProductDetail = async () => {
    if (!id) return;
    setLoading(true);
    setError("");
    try {
      // Fetch core product detail
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Product not found");
        }
        throw new Error("Server responded with an error");
      }
      const data: Product = await res.json();
      setProduct(data);

      // Fetch recommended items (other products in same category or generic)
      const recommendationsRes = await fetch("/api/products");
      if (recommendationsRes.ok) {
        const allProducts: Product[] = await recommendationsRes.json();
        const otherItems = allProducts.filter(p => p.id !== id).slice(0, 3);
        setRecommended(otherItems);
      }
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Failed to retrieve product details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetail();
    setQuantity(1); // Reset quantity on product change
    setAddedMessage(false);
  }, [id]);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    await addToCart(product.id, quantity);
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center min-h-screen">
        <div className="h-12 w-12 rounded-full border-4 border-gray-100 border-t-amber-500 animate-spin mx-auto mb-4" />
        <p className="text-sm font-medium text-gray-500 animate-pulse">Requesting product ledger data from API...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen">
        <div className="max-w-md mx-auto p-6 bg-amber-50/50 border border-amber-200 rounded-2xl text-center space-y-4 shadow-sm">
          <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-gray-900">Resource Unavailable</h3>
          <p className="text-sm text-gray-600">{error || "This item is currently offline or unreachable."}</p>
          <div className="pt-2 flex justify-center space-x-3">
            <Link
              to="/shop"
              className="inline-flex items-center px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold transition hover:bg-neutral-800"
            >
              <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen bg-white" id="product-detail-page">
      {/* Breadcrumb / Back button */}
      <div className="mb-6 flex justify-start">
        <Link
          to="/shop"
          className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-neutral-950 transition"
          id="pdp-back-btn"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Shop Catalog
        </Link>
      </div>

      {/* Main product presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left mb-16">
        {/* Gallery column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 aspect-5/4 shadow-sm relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              id="pdp-main-image"
            />
            {/* Status indicators */}
            <div className="absolute top-4 left-4 flex flex-col space-y-2">
              <span className="px-3 py-1 bg-neutral-950 text-white text-xxs font-bold rounded-lg uppercase tracking-wider font-mono">
                {product.category}
              </span>
              {addedMessage && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-3 py-1 bg-emerald-600 text-white text-xxs font-bold rounded-lg shadow-md"
                >
                  ✓ Added to cart!
                </motion.span>
              )}
            </div>
          </div>
        </div>

        {/* Specs and selection column */}
        <div className="lg:col-span-6 flex flex-col justify-start space-y-6">
          <div className="space-y-2.5">
            {/* Rating */}
            <div className="flex items-center space-x-1.5">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-extrabold text-gray-900 ml-1">{product.rating}</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                {product.reviewsCount} verified reviews
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-950 font-sans leading-tight" id="pdp-title">
              {product.name}
            </h1>

            {/* Price tag */}
            <div className="flex items-baseline space-x-2 pt-1">
              <span className="text-3xl font-black text-neutral-950 font-mono">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
                {product.inStock ? "● In Stock" : "● Out of Stock"}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-5">
            {product.description}
          </p>

          {/* Selection block */}
          {product.inStock ? (
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-5">
                <div>
                  <span className="block text-xxs font-bold text-gray-400 uppercase tracking-wider mb-2">Quantity</span>
                  <div className="flex items-center border border-gray-200 rounded-xl bg-white p-1" id="pdp-qty-control">
                    <button
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                      className="p-2 text-gray-500 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg disabled:opacity-40 transition cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 text-sm font-bold font-mono text-gray-800 min-w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      className="p-2 text-gray-500 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 pt-6">
                  <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center space-x-2 py-3.5 bg-neutral-900 text-white font-semibold text-sm rounded-xl hover:bg-neutral-800 transition shadow-md group cursor-pointer"
                    id="pdp-add-cart-btn"
                  >
                    <ShoppingCart className="h-4 w-4 text-amber-300" />
                    <span>Add {quantity} to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-100">
              <p className="p-3 bg-red-50 text-red-600 text-xs font-semibold rounded-xl text-center">
                This item is currently sold out. Sign up to the newsletter below to get stock alerts.
              </p>
            </div>
          )}

          {/* Core Trust Policies list */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100 text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <Truck className="h-4 w-4 text-neutral-400" />
              <span>Complimentary shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-neutral-400" />
              <span>2-year valid warranty</span>
            </div>
            <div className="flex items-center space-x-2">
              <RotateCcw className="h-4 w-4 text-neutral-400" />
              <span>30-day trial returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Spec Matrix section */}
      <section className="border-t border-gray-100 pt-10 text-left mb-16">
        <h2 className="text-lg font-bold text-gray-950 font-sans tracking-tight mb-5">Product Specifications</h2>
        <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm max-w-3xl">
          <table className="min-w-full divide-y divide-gray-50">
            <tbody className="bg-white divide-y divide-gray-50">
              {Object.entries(product.specs).map(([key, val], index) => (
                <tr key={key} className={index % 2 === 0 ? "bg-white" : "bg-neutral-50/50"}>
                  <td className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/3">
                    {key}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-700 font-medium">
                    {val}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Related items section */}
      {recommended.length > 0 && (
        <section className="border-t border-gray-100 pt-10 text-left">
          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-bold text-gray-950 font-sans tracking-tight">Complete the Desktop Setup</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommended.map((item) => (
              <Link
                key={item.id}
                to={`/shop/${item.id}`}
                className="group border border-gray-50 rounded-xl overflow-hidden p-3 hover:shadow-md transition bg-white block"
              >
                <div className="aspect-video overflow-hidden rounded-lg bg-gray-50 mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition duration-300"
                  />
                </div>
                <h3 className="font-bold text-sm text-gray-800 group-hover:text-amber-600 transition truncate">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">
                  ${item.price.toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
