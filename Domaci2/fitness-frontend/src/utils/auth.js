// src/utils/auth.js

// token iz localStorage
export function getToken() {
  return localStorage.getItem("token");
}

// korisnik iz localStorage
export function getUser() {
  const raw = localStorage.getItem("user");
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// da li je member ili admin
export function isMemberOrAdmin() {
  const role = getUser()?.role?.toLowerCase();
  return role === "member" || role === "admin";
}

// logout i redirekcija na /login
export function logoutToLogin() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
}
