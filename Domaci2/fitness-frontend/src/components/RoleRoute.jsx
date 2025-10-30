import { Navigate } from "react-router-dom";
import { isMemberOrAdmin } from "../utils/auth";

export default function RoleRoute({ children }) {
  if (!isMemberOrAdmin()) return <Navigate to="/profile" replace />;
  return children;
}