import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if session exists in localStorage
    const storedUser = localStorage.getItem("aura_user");
    const storedToken = localStorage.getItem("aura_token");
    
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (e) {
        console.error("Failed to restore auth session:", e);
      }
    }
    setLoading(false);
  }, []);

  const loginWithGoogle = async (email: string, name: string, picture?: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, picture }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to authenticate with backend server");
      }
      
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("aura_user", JSON.stringify(data.user));
        localStorage.setItem("aura_token", data.token);
      }
    } catch (error) {
      console.error("Auth API error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("aura_user");
    localStorage.removeItem("aura_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
