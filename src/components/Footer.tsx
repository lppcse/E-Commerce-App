import React from "react";
import { Sparkles, Shield, RefreshCw, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-12 mt-auto border-t border-neutral-800" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <span className="p-2 bg-neutral-800 text-white rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-amber-300" />
              </span>
              <span className="font-semibold text-lg font-sans tracking-wide">Aura Studio</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Premium designer workplace accessories and productivity tools engineered for comfort, style, and acoustic perfection.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Shop Categories</h3>
            <ul className="space-y-2.5 text-sm">
              <li><span className="hover:text-white transition cursor-pointer">Mechanical Keyboards</span></li>
              <li><span className="hover:text-white transition cursor-pointer">Ergonomic Mouse Setups</span></li>
              <li><span className="hover:text-white transition cursor-pointer">Minimalist Desk Mats</span></li>
              <li><span className="hover:text-white transition cursor-pointer">Studio Headphones</span></li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Core Guarantees</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span>2 Year Secure Warranty</span>
              </li>
              <li className="flex items-center space-x-2">
                <RefreshCw className="h-4 w-4 text-emerald-400" />
                <span>30-Day Hassle-Free Returns</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span>24/7 Dedicated Support</span>
              </li>
            </ul>
          </div>

          {/* Tech Spec Column */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Service Infrastructure</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Powered by a high-performance RESTful API microservice mimicking enterprise Spring Boot controller schemas. Built on React 19 + Express.
            </p>
            <div className="mt-3 inline-flex items-center space-x-2 px-2.5 py-1 bg-neutral-800 text-neutral-300 text-xxs font-mono rounded-md">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>REST SERVICE - LIVE</span>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-xs text-neutral-500">&copy; 2026 Aura Studio Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0 text-xs text-neutral-500">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-400 cursor-pointer">API Docs</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
