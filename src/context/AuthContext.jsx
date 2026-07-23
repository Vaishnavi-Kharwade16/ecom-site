import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const SESSION_KEY = "ec_session";
const FAVS_KEY = "ec_favs";

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => {
    try {
      const s = localStorage.getItem(SESSION_KEY);
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const f = localStorage.getItem(FAVS_KEY);
      return f ? JSON.parse(f) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVS_KEY, JSON.stringify(favorites));
  }, [favorites]);

 const saveSession = (data) => {
    console.log("Exact backend data arrived:", data);
    const user = data?.user || data?.data?.user || null;
    const token = data?.token || data?.data?.token || null;

    if (user && token) {
      const session = { user, token };
      setSession(session);
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      console.error("Auth Error: User or Token missing in response!", data);
    }
  };

  const getSession = () => {
    try {
      const s = localStorage.getItem(SESSION_KEY);
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  };

  const signUp = async ({ name, email, password }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, { name, email, password });
      saveSession(res.data);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || "Signup failed." };
    }
  };

  const signIn = async ({ email, password }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signin`, { email, password });
      saveSession(res.data);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || "Sign in failed." };
    }
  };

  const signOut = () => {
    setSession(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const id = product.id || product._id;
      const exists = prev.find((p) => p.id === id);
      return exists ? prev.filter((p) => p.id !== id) : [...prev, { ...product, id }];
    });
  };

  const isFavorite = (id) => favorites.some((p) => p.id === id);

  const token = session?.token || null;
  const isAdmin = session?.user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ user: session?.user || null, token, signUp, signIn, signOut, favorites, toggleFavorite, isFavorite, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;