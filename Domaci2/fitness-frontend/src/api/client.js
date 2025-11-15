// src/api/client.js
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: { Accept: "application/json" },
});

// Funkcija za postavljanje ili uklanjanje tokena za autentifikaciju
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem("token");
  }
}

// Proveri da li postoji sačuvan token pri pokretanju aplikacije
const saved = localStorage.getItem("token");
if (saved) setAuthToken(saved);

export default api;
