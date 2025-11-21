// CUSTOM HOOK ZA AUTENTIFIKACIJU KORISNIKA
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api, { setAuthToken } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => { setAuthToken(token); }, [token]);

  const login = async (email, password) => {
    const { data } = await api.post("/login", { email, password });
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  };

  const loginGuest = async (name = "") => {
    const { data } = await api.post("/guest/login", name ? { name } : {});
    setToken(data.token);
    setUser({ ...data.user, email: "guest@example.test" });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify({ ...data.user, email: "guest@example.test" }));
    return data.user;
  };

  // registracija kroz backend /register
  const register = async ({ name, email, password, role = "member", fitness_level = "beginner" }) => {
    const { data } = await api.post("/register", { name, email, password, role, fitness_level });
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  };

  const logout = async () => {
    try { await api.post("/logout"); } catch { }
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = useMemo(
    () => ({ token, user, login, loginGuest, register, logout }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
