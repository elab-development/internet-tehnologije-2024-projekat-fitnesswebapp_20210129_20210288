import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, setAuthToken } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => { setAuthToken(token); }, [token]);

  // email/password login
  const login = async (email, password) => {
    const { data } = await api.post("/login", { email, password });
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  };

  // guest login
  const loginGuest = async (name = "") => {
    const { data } = await api.post("/guest/login", name ? { name } : {});
    setToken(data.token);
    const fakeEmail = "guest@example.test";
    const newUser = { ...data.user, email: fakeEmail };
    setUser(newUser);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(newUser));
    return newUser;
  };

  // registracija (dodato fitness_level!)
  const register = async ({ name, email, password, role, fitness_level }) => {
    const { data } = await api.post("/register", {
      name, email, password, role, fitness_level
    });
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  };

  const logout = async () => {
    try { await api.post("/logout"); } catch {}
    setToken(""); setUser(null);
    localStorage.removeItem("token"); localStorage.removeItem("user");
  };

  const value = useMemo(() => ({ token, user, login, loginGuest, register, logout }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
