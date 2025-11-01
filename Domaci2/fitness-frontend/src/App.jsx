import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function ProtectedDemo() {
  return (
    <div style={{ padding: 24 }}>
      <p>Vidiš ovo jer imaš token (ulogovan si ili guest).</p>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <ProtectedDemo />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />
      </Routes>
    </div>
  );
}
