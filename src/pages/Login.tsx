import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleSignInButton } from "../components/GoogleSignInButton";
import { Sparkles, ShieldCheck, Mail, ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "motion/react";

export const Login: React.FC = () => {
  const { loginWithGoogle, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Determine redirection target (e.g. back to cart, shop or home)
  const from = (location.state as any)?.from?.pathname || "/";

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMessage("");
    try {
      const derivedName = name || email.split("@")[0];
      await loginWithGoogle(email, derivedName);
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      setErrorMessage("Authentication failed. Please verify server connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = () => {
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 bg-white py-12" id="login-page">
      {/* Return button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center text-xs font-semibold text-gray-400 hover:text-gray-950 transition cursor-pointer self-center"
      >
        <ArrowLeft className="h-4 w-4 mr-1.5" />
        Return to previous page
      </button>

      {/* Main card box */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden p-8 text-left relative"
        id="login-card"
      >
        {/* Brand visual header */}
        <div className="flex flex-col items-center text-center space-y-2 mb-8">
          <div className="p-3 bg-neutral-900 text-white rounded-xl flex items-center justify-center shadow-md">
            <Sparkles className="h-6 w-6 text-amber-300 animate-pulse" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-950 font-sans tracking-tight">Welcome to Aura Studio</h2>
          <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
            Secure login integrates verified credentials with custom database registries.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        <div className="space-y-6">
          {/* Google SSO Button block */}
          <div className="space-y-3">
            <p className="text-xxs font-bold text-gray-400 uppercase tracking-widest text-center">Verified Provider</p>
            <GoogleSignInButton onSuccess={handleGoogleSuccess} />
          </div>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-4 text-xxs font-bold text-gray-300 uppercase tracking-widest">Or login manually</span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          {/* Form input fields */}
          <form onSubmit={handleManualLogin} className="space-y-4">
            <div>
              <label className="block text-xxs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xxs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Display Name (Optional)
              </label>
              <input
                type="text"
                placeholder="Lokesh"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition bg-white"
              />
            </div>

            {loading || authLoading ? (
              <button
                disabled
                className="w-full flex items-center justify-center space-x-2 py-3 bg-neutral-900 text-white rounded-xl text-xs font-semibold"
              >
                <Loader2 className="h-4 w-4 animate-spin text-amber-300" />
                <span>Authenticating Profile...</span>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition shadow-md cursor-pointer"
                id="login-manual-submit"
              >
                Continue to Dashboard
              </button>
            )}
          </form>

          {/* Compliance footers */}
          <div className="flex items-center justify-center space-x-1.5 text-xxs text-neutral-400 pt-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Fulfills standard OIDC handshake protocols.</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
