import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Ako nema tokena idi na /login
export default function ProtectedRoute({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}
