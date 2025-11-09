// src/App.jsx
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";

// Workouts
import MyWorkouts from "./pages/MyWorkouts.jsx";
import CreateWorkout from "./pages/CreateWorkout.jsx";
import EditWorkout from "./pages/EditWorkout.jsx";

// Rute zaštite
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";

  // Admin - Users
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminUserDetail from "./pages/AdminUserDetails.jsx";

// Goals - Admin
import AdminGoals from "./pages/AdminGoals.jsx";
import AdminGoalForm from "./pages/AdminGoalForm.jsx";

export default function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <NavBar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Workouts */}
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

        {/* Admin - Users */}
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

        <Route
          path="/goals"
          element={
            <ProtectedRoute>
              <RoleRoute allowed={["admin"]}>
                <AdminGoals />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/goals/new"
          element={
            <ProtectedRoute>
              <RoleRoute allowed={["admin"]}>
                <AdminGoalForm />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/goals/:id/edit"
          element={
            <ProtectedRoute>
              <RoleRoute allowed={["admin"]}>
                <AdminGoalForm />
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
