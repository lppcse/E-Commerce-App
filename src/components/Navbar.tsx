import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag, User, LogOut, Menu, X, Sparkles, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "motion/react";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate("/");
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop Products", path: "/shop" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-gray-100" id="app-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2 font-sans font-bold text-xl tracking-tight text-gray-900" id="nav-logo">
              <span className="p-2 bg-neutral-900 text-white rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-amber-300" />
              </span>
              <span className="font-semibold text-gray-950 font-sans tracking-wide">Aura</span>
              <span className="text-gray-400 font-normal">Studio</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "text-neutral-900 border-b-2 border-neutral-900 pb-1"
                    : "text-gray-500 hover:text-neutral-900"
                }`}
                id={`nav-link-${link.label.toLowerCase().replace(" ", "-")}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-neutral-900 hover:bg-gray-50 rounded-full transition-all"
              aria-label="View Cart"
              id="nav-cart-btn"
            >
              <ShoppingBag className="h-5 w-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xxs font-bold leading-none text-white bg-amber-500 rounded-full min-w-4 h-4 transform translate-x-1 -translate-y-1"
                    id="nav-cart-badge"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Auth Dropdown or Login Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 hover:bg-gray-100 rounded-full transition-all focus:outline-none"
                  id="nav-user-menu-btn"
                >
                  <img
                    className="h-8 w-8 rounded-full border border-gray-200 object-cover"
                    src={user.picture}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                  />
                  <span className="hidden lg:block text-sm font-medium text-gray-700 max-w-28 truncate">
                    {user.name}
                  </span>
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <>
                      {/* Dropdown Backdrop */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setProfileDropdownOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20"
                        id="nav-user-dropdown"
                      >
                        <div className="px-4 py-2.5 border-b border-gray-50">
                          <p className="text-xs text-gray-400">Signed in as</p>
                          <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        
                        <div className="p-1">
                          <button
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              navigate("/cart");
                            }}
                            className="flex w-full items-center px-3 py-2 text-sm text-gray-600 hover:text-neutral-900 hover:bg-gray-50 rounded-lg transition"
                          >
                            <ShoppingBag className="mr-2 h-4 w-4 text-gray-400" />
                            My Orders & Cart
                          </button>
                        </div>

                        <div className="border-t border-gray-50 p-1">
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                            id="nav-logout-btn"
                          >
                            <LogOut className="mr-2 h-4 w-4 text-red-400" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition shadow-sm"
                id="nav-login-btn"
              >
                <User className="h-4 w-4 mr-1.5" />
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-neutral-900 rounded-lg focus:outline-none"
              id="nav-mobile-menu-btn"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
            id="nav-mobile-menu"
          >
            <div className="px-2 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                    location.pathname === link.path
                      ? "bg-neutral-50 text-neutral-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-neutral-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full px-3 py-2.5 rounded-lg text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 text-center"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
