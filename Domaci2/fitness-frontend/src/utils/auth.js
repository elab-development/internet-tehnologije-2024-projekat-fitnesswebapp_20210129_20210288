export function getToken() {
  return localStorage.getItem("token");
}

export function getUser() {
  const raw = localStorage.getItem("user");
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isMemberOrAdmin() {
  const role = getUser()?.role?.toLowerCase();
  return role === "member" || role === "admin";
}

export function logoutToLogin() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
}
