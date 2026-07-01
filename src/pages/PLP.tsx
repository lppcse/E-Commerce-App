import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Product } from "../types";
import { useCart } from "../context/CartContext";
import { Search, Star, Filter, ArrowUpDown, ShoppingCart, RefreshCw, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const PLP: React.FC = () => {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search, Category, and Sorting States
  const [searchTerm, setSearchTerm] = useState("");
  const activeCategory = searchParams.get("category") || "All";
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "rating">("default");

  const categories = ["All", "Keyboards", "Desks", "Lighting", "Audio"];

  // Fetch from backend REST API (Controller emulation)
  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (e) {
      console.error("Failed to load products from REST API:", e);
      setError("Unable to connect to the backend database service. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter and Sort local pipeline
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchTerm.trim() !== "") {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category tab filter
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Sorting algorithm
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [products, searchTerm, activeCategory, sortBy]);

  const handleCategorySelect = (category: string) => {
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen bg-white" id="product-list-page">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-6 mb-8 text-left">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 font-sans" id="plp-title">
            The Studio Workspace
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Browse our carefully vetted products, synced with real backend database controller registers.
          </p>
        </div>
        <div className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs font-mono text-gray-400 bg-neutral-50 px-3 py-1.5 rounded-lg border border-gray-100">
          <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin text-amber-500" : ""}`} />
          <span>DATABASE STREAM: {loading ? "CONNECTING..." : "CONNECTED"}</span>
        </div>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-8">
        {/* Live Search bar */}
        <div className="lg:col-span-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products, materials, specs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition"
            id="plp-search-input"
          />
        </div>

        {/* Category Tabs list */}
        <div className="lg:col-span-5 flex overflow-x-auto no-scrollbar py-1 space-x-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition ${
                activeCategory === cat
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              id={`plp-cat-tab-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown selector */}
        <div className="lg:col-span-3 flex items-center justify-end space-x-2 w-full">
          <ArrowUpDown className="h-4 w-4 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3.5 py-2 text-xs font-medium border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition"
            id="plp-sort-select"
          >
            <option value="default">Default Sort</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated (Stars)</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="relative flex items-center justify-center">
            <div className="h-12 w-12 rounded-full border-4 border-gray-100 border-t-amber-500 animate-spin" />
            <span className="absolute text-xxs font-mono text-amber-600 animate-pulse font-bold">SQL</span>
          </div>
          <p className="text-sm font-medium text-gray-600 animate-pulse">Running REST API database queries...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="max-w-md mx-auto p-6 bg-red-50 border border-red-100 rounded-2xl text-center space-y-4 my-12 shadow-sm">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto" />
          <h3 className="text-lg font-bold text-red-950">Data Hydration Error</h3>
          <p className="text-sm text-red-700">{error}</p>
          <button
            onClick={fetchProducts}
            className="px-5 py-2 bg-red-600 text-white text-xs font-semibold rounded-xl hover:bg-red-700 transition"
          >
            Retry DB Query
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="py-20 text-center space-y-3">
          <p className="text-gray-400 text-sm font-semibold">No products found matching filters.</p>
          <p className="text-xs text-gray-500">Try adjusting your category selection or clear search terms.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              searchParams.delete("category");
              setSearchParams(searchParams);
            }}
            className="px-4 py-2 bg-gray-100 text-gray-800 text-xs font-semibold rounded-xl hover:bg-gray-200 transition"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Products Grid layout */}
      <AnimatePresence mode="popLayout">
        {!loading && !error && filteredProducts.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            id="plp-grid"
          >
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col h-full"
                id={`product-card-${product.id}`}
              >
                {/* Product image with quick-view badge */}
                <div className="relative aspect-5/4 overflow-hidden bg-gray-50">
                  <Link to={`/shop/${product.id}`} className="block h-full w-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="absolute top-4 left-4 flex flex-col space-y-1.5">
                    {/* Category Label */}
                    <span className="px-2.5 py-1 bg-white/95 backdrop-blur text-xxs font-bold text-gray-950 rounded-lg shadow-sm font-sans uppercase tracking-wider">
                      {product.category}
                    </span>
                    {/* Stock Status */}
                    {!product.inStock && (
                      <span className="px-2.5 py-1 bg-red-600 text-white text-xxs font-bold rounded-lg shadow-sm">
                        OUT OF STOCK
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 text-left">
                  {/* Rating block */}
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviewsCount})</span>
                  </div>

                  {/* Title & Description */}
                  <Link to={`/shop/${product.id}`} className="block group-hover:text-amber-600 transition">
                    <h3 className="font-bold text-gray-950 font-sans text-base leading-snug line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed flex-1">
                    {product.description}
                  </p>

                  {/* Pricing and Cart Actions */}
                  <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div>
                      <p className="text-xxs text-gray-400 font-medium uppercase font-mono tracking-wider">Price USD</p>
                      <p className="text-lg font-extrabold text-neutral-950 font-mono">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>

                    {product.inStock ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product.id, 1);
                        }}
                        className="p-3 bg-neutral-950 text-white hover:bg-neutral-800 rounded-xl transition shadow-sm active:scale-95 cursor-pointer flex items-center justify-center space-x-1.5"
                        id={`add-to-cart-quick-${product.id}`}
                        aria-label="Add to cart"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span className="text-xs font-semibold px-0.5">Add</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="p-3 bg-gray-100 text-gray-400 rounded-xl cursor-not-allowed text-xs font-semibold px-4"
                      >
                        Sold Out
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
