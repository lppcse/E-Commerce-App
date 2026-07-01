import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { PLP } from "./pages/PLP";
import { PDP } from "./pages/PDP";
import { Cart } from "./pages/Cart";
import { Login } from "./pages/Login";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-amber-100 selection:text-neutral-900" id="aura-app-root">
            {/* Navigation Header */}
            <Navbar />

            {/* Main Content viewport */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<PLP />} />
                <Route path="/shop/:id" element={<PDP />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                
                {/* Catch-all fallback redirect to Home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Footer section */}
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
