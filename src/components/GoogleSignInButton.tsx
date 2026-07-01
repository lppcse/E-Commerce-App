import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Sparkles, Loader2 } from "lucide-react";

interface GoogleSignInButtonProps {
  onSuccess?: () => void;
  onError?: (err: string) => void;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onSuccess, onError }) => {
  const { loginWithGoogle } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customEmail, setCustomEmail] = useState("");
  const [customName, setCustomName] = useState("");
  const [errorText, setErrorText] = useState("");

  const presetAccounts = [
    {
      email: "lokeshcse1990@gmail.com",
      name: "Lokesh Kumar",
      picture: "https://api.dicebear.com/7.x/adventurer/svg?seed=Lokesh"
    },
    {
      email: "guest.developer@aistudio.com",
      name: "Aura Developer",
      picture: "https://api.dicebear.com/7.x/adventurer/svg?seed=Aura"
    }
  ];

  const handleAccountSelect = async (email: string, name: string, picture: string) => {
    setLoading(true);
    setErrorText("");
    try {
      await loginWithGoogle(email, name, picture);
      setShowPopup(false);
      if (onSuccess) onSuccess();
    } catch (e) {
      console.error(e);
      setErrorText("Google Service authentication failed. Please try again.");
      if (onError) onError("Auth failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) {
      setErrorText("Please enter a valid email address.");
      return;
    }
    const derivedName = customName || customEmail.split("@")[0];
    const generatedPicture = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(customEmail)}`;
    await handleAccountSelect(customEmail, derivedName, generatedPicture);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Official Google Brand Button */}
      <button
        type="button"
        onClick={() => setShowPopup(true)}
        className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none transition-all shadow-sm group cursor-pointer"
        id="google-sso-trigger"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" width="100%" height="100%">
          <path
            fill="#EA4335"
            d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.742 1.066 15.06 0 12 0 7.354 0 3.314 2.633 1.258 6.477l3.916 3.197z"
          />
          <path
            fill="#4285F4"
            d="M16.04 15.345c1.237-.82 2.05-2.22 2.05-3.845a5.523 5.523 0 0 0-.092-.955H12v3.627h3.582c-.155.836-.628 1.545-1.336 2.018l2.91 2.378c1.7-1.56 2.682-3.856 2.682-6.52 0-.618-.055-1.218-.164-1.8H12V10h6.182c.09.52.136 1.054.136 1.6 0 3.245-1.155 5.973-3.155 7.827l-.123-.082-2.91-2.378z"
          />
          <path
            fill="#FBBC05"
            d="M5.266 14.235 1.35 17.432A11.94 11.94 0 0 0 12 24c3.06 0 5.742-1.066 7.65-2.882l-3.51-3.51A7.07 7.07 0 0 1 12 19.09c-3.11 0-5.782-2.127-6.734-5.023l-.11-.035-3.906 3.2z"
          />
          <path
            fill="#34A853"
            d="M1.258 17.523A11.96 11.96 0 0 1 0 12c0-1.99.49-3.864 1.35-5.523l3.916 3.197A7.075 7.075 0 0 0 4.91 12c0 1.255.327 2.436.9 3.477l-4.55 3.523-.002.523z"
          />
        </svg>
        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 font-sans">
          Sign in with Google
        </span>
      </button>

      {/* Google Account Picker Modal Overlay */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !loading && setShowPopup(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 z-10 p-6 flex flex-col"
              id="google-sso-modal"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-neutral-100 rounded-lg">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.9h6.69a5.74 5.74 0 0 1-2.48 3.77v3.15h4.01c2.34-2.16 3.68-5.33 3.68-8.75z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.85-3c-1.08.72-2.45 1.16-4.11 1.16-3.15 0-5.81-2.13-6.76-5.01H1.14v3.1C3.12 21.28 7.27 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.24 14.24a7.22 7.22 0 0 1 0-4.48V6.66H1.14a11.96 11.96 0 0 0 0 10.68l4.1-3.1z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.27 0 3.12 2.72 1.14 6.66l4.1 3.2c.95-2.88 3.61-5.11 6.76-5.11z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-950 font-sans text-base">Sign in with Google</h3>
                    <p className="text-xs text-gray-500">to continue to Aura Studio</p>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowPopup(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg transition"
                >
                  ✕
                </button>
              </div>

              {errorText && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
                  {errorText}
                </div>
              )}

              {loading ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-3">
                  <Loader2 className="h-8 w-8 text-neutral-900 animate-spin" />
                  <p className="text-sm font-medium text-gray-600 animate-pulse">Contacting Google Auth services...</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Account Selector List */}
                  <div className="space-y-2.5">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Choose an account</p>
                    {presetAccounts.map((acc, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleAccountSelect(acc.email, acc.name, acc.picture)}
                        className="w-full flex items-center space-x-3 p-3 border border-gray-100 rounded-xl hover:bg-neutral-50 hover:border-gray-200 transition text-left cursor-pointer"
                      >
                        <img className="h-10 w-10 rounded-full bg-neutral-100 border border-gray-100" src={acc.picture} alt={acc.name} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{acc.name}</p>
                          <p className="text-xs text-gray-500 truncate">{acc.email}</p>
                        </div>
                        <span className="text-xxs font-mono bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded uppercase">
                          {index === 0 ? "Personal" : "Dev Mock"}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Or Custom Account */}
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Or use another account</p>
                    <form onSubmit={handleCustomSubmit} className="space-y-3">
                      <div>
                        <label className="block text-xxs font-semibold text-gray-500 uppercase mb-1">Gmail Address</label>
                        <input
                          type="email"
                          required
                          placeholder="your.name@gmail.com"
                          value={customEmail}
                          onChange={(e) => setCustomEmail(e.target.value)}
                          className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xxs font-semibold text-gray-500 uppercase mb-1">Full Name (Optional)</label>
                        <input
                          type="text"
                          placeholder="Alex Mercer"
                          value={customName}
                          onChange={(e) => setCustomName(e.target.value)}
                          className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition"
                      >
                        Sign In with custom Google account
                      </button>
                    </form>
                  </div>

                  <div className="flex items-center justify-center space-x-1.5 text-xxs text-neutral-400 pt-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Secure simulated OIDC callback verified.</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
