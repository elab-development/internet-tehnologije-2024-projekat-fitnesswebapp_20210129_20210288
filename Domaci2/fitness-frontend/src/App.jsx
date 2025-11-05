// src/App.jsx
import { Routes, Route } from "react-router-dom";
// Komponente
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";

// Treninzi (workouts)
import MyWorkouts from "./pages/MyWorkouts.jsx";
import CreateWorkout from "./pages/CreateWorkout.jsx";
import EditWorkout from "./pages/EditWorkout.jsx";

// Zaštita ruta (samo ulogovani)
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";

// ADMIN stranice
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminUserDetail from "./pages/AdminUserDetails.jsx";

export default function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <NavBar />

      <Routes>
        {/* Public rute */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Lista svih korisnikovih treninga */}
        <Route
          path="/workouts"
          element={
            <ProtectedRoute>
              <RoleRoute allowed={["member", "admin"]}>
                <MyWorkouts />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Kreiranje novog treninga */}
        <Route
          path="/workouts/new"
          element={
            <ProtectedRoute>
              <RoleRoute allowed={["member", "admin"]}>
                <CreateWorkout />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Izmena postojećeg treninga */}
        <Route
          path="/workouts/:id/edit"
          element={
            <ProtectedRoute>
              <RoleRoute allowed={["member", "admin"]}>
                <EditWorkout />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* ADMIN rute */}

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <RoleRoute allowed={["admin"]}>
                <AdminUsers />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users/:id"
          element={
            <ProtectedRoute>
              <RoleRoute allowed={["admin"]}>
                <AdminUserDetail />
              </RoleRoute>
            </ProtectedRoute>
          }
        />


        {/* Fallback */}
        <Route path="*" element={<div className="container section">Not found</div>} />
      </Routes>
    </div>
  );
}
