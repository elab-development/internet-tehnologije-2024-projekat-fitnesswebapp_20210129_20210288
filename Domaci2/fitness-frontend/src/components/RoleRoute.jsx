// src/components/RoleRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Ako korisnik nema rolu iz 'allowed', vraća na početnu.
 */
export default function RoleRoute({ allowed = [], children }) {
  const { user } = useAuth();

  // nema user-a idi na login
  if (!user) return <Navigate to="/login" replace />;

  // ako je lista prazna, propuštamo sve ulogovane
  if (allowed.length === 0) return children;

  // ako postoji lista, rola mora biti u njoj
  if (!allowed.includes(user.role)) return <Navigate to="/" replace />;

  return children;
}
