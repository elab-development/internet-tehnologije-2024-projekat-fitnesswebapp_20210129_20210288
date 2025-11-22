import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Zaštićena ruta koja dozvoljava pristup samo autentifikovanim korisnicima
export default function ProtectedRoute({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}
