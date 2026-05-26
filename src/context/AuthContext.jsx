import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "ec_users";
const SESSION_KEY = "ec_session";
const FAVS_KEY = "ec_favs";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
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

  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    } catch {
      return [];
    }
  };

  const signUp = ({ name, email, password, role = "user" }) => {
    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email already registered." };
    }
    const newUser = { id: Date.now().toString(), name, email, password, role };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    return { success: true };
  };

  const signIn = ({ email, password }) => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { success: false, error: "Invalid email or password." };
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    return { success: true };
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      return exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
    });
  };

  const isFavorite = (id) => favorites.some((p) => p.id === id);

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ user, signUp, signIn, signOut, favorites, toggleFavorite, isFavorite, isAdmin }}
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