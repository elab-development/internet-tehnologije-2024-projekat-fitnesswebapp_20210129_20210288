import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: { Accept: "application/json" },
});

// pozovi ovo kad dobiješ token (login/guest)
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem("token");
  }
}

// automatski učitaj token ako postoji (osvežen tab)
const saved = localStorage.getItem("token");
if (saved) setAuthToken(saved);
