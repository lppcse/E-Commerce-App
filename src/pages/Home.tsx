import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Keyboard, ShieldCheck, Heart, Zap } from "lucide-react";
import { motion } from "motion/react";

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white" id="home-page">
      {/* Dynamic Hero Banner */}
      <section className="relative bg-gradient-to-b from-neutral-50 to-white pt-20 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 px-3 py-1.5 bg-amber-500/10 text-amber-700 text-xs font-semibold rounded-full border border-amber-500/20"
              >
                <Sparkles className="h-4 w-4 text-amber-600" />
                <span>The Aura Studio Collection — Up to 20% Off</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 font-sans leading-tight"
              >
                Acoustic Perfection.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-neutral-700 to-amber-600">
                  Minimalist Form.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-600 text-lg leading-relaxed max-w-xl"
              >
                Elevate your desktop setup with premium, high-contrast workplace accessories. Handcrafted keys, medical-grade vertical mouse controls, and natural felt desk mats designed for flow.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4"
              >
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-neutral-900 text-white font-semibold text-sm rounded-xl hover:bg-neutral-800 transition duration-200 shadow-md group"
                  id="hero-shop-btn"
                >
                  Explore Catalog
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/shop?category=Keyboards"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm rounded-xl transition duration-200"
                >
                  View Keyboards
                </Link>
              </motion.div>
            </div>

            {/* Premium Interactive Image Display */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-100"
              >
                <img
                  src="https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600"
                  alt="Premium Workspace Showcase"
                  className="w-full object-cover aspect-4/3"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur px-4 py-3.5 rounded-xl border border-white/20 flex items-center justify-between">
                  <div>
                    <p className="text-xxs font-semibold uppercase text-amber-600 tracking-wider font-mono">Featured Highlight</p>
                    <p className="text-sm font-bold text-gray-950 font-sans">Aura Mechanical Keyboard</p>
                  </div>
                  <Link
                    to="/shop"
                    className="p-2 bg-neutral-950 hover:bg-neutral-800 rounded-lg text-white transition"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
              {/* Background accent */}
              <div className="absolute -top-6 -left-6 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl z-0" />
              <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-neutral-300/30 rounded-full blur-3xl z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values / Trust Badges */}
      <section className="py-12 border-y border-gray-100 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white rounded-xl shadow-sm text-neutral-950 border border-gray-100">
                <Keyboard className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 font-sans text-base">Acoustic Perfect Tuning</h3>
                <p className="text-sm text-gray-500 mt-1">Every custom switch lubed, mounted, and dampened with custom silicone layers.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white rounded-xl shadow-sm text-neutral-950 border border-gray-100">
                <ShieldCheck className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 font-sans text-base">Authentic Materials</h3>
                <p className="text-sm text-gray-500 mt-1">Solid CNC aluminum, natural merino wool felt, walnut timber, and beryllium sound drivers.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white rounded-xl shadow-sm text-neutral-950 border border-gray-100">
                <Zap className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 font-sans text-base">Full-Stack REST Architecture</h3>
                <p className="text-sm text-gray-500 mt-1">Direct backend integration, structured model serialization, and live session preservation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promoted Categories / Interactive Links */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center space-y-3 mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-950 font-sans">Crafted Collections</h2>
            <p className="text-gray-500 text-sm max-w-md">Browse our boutique products curated by active workspace designers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Category card 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="relative group rounded-2xl overflow-hidden shadow-md aspect-5/4 cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600"
                alt="Keyboards Category"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/50 transition-colors" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-left">
                <p className="text-amber-400 text-xs font-mono font-semibold uppercase">01 / Boutique Hardware</p>
                <h3 className="text-xl font-bold text-white font-sans mt-1">Keyboards</h3>
                <Link to="/shop?category=Keyboards" className="inline-flex items-center text-xs font-medium text-white mt-3 group-hover:underline">
                  Browse Series <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Category card 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="relative group rounded-2xl overflow-hidden shadow-md aspect-5/4 cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600"
                alt="Desks Category"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/50 transition-colors" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-left">
                <p className="text-amber-400 text-xs font-mono font-semibold uppercase">02 / Ergonomic Layout</p>
                <h3 className="text-xl font-bold text-white font-sans mt-1">Desks & Mats</h3>
                <Link to="/shop?category=Desks" className="inline-flex items-center text-xs font-medium text-white mt-3 group-hover:underline">
                  Browse Series <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Category card 3 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="relative group rounded-2xl overflow-hidden shadow-md aspect-5/4 cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600"
                alt="Audio Category"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/50 transition-colors" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-left">
                <p className="text-amber-400 text-xs font-mono font-semibold uppercase">03 / Studio Fidelity</p>
                <h3 className="text-xl font-bold text-white font-sans mt-1">Audio Gears</h3>
                <Link to="/shop?category=Audio" className="inline-flex items-center text-xs font-medium text-white mt-3 group-hover:underline">
                  Browse Series <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern Newsletter Section */}
      <section className="bg-neutral-950 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 space-y-6">
          <Heart className="h-8 w-8 text-amber-400 mx-auto animate-pulse" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-sans">Join the Aura Circle</h2>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto">
            Get early access to mechanical keyboard product drops, bespoke timber restocks, and unique discount campaigns.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center max-w-md mx-auto gap-3 pt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-4 py-3 text-sm bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={() => alert("Thank you for signing up to the Aura Circle!")}
              className="w-full sm:w-auto px-6 py-3 bg-white text-neutral-950 text-sm font-semibold rounded-xl hover:bg-neutral-100 transition duration-200"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
