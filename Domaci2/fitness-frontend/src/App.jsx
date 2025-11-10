// src/App.jsx
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";

// Public workouts (vidljivo svim ulogama: guest/member/admin)
import PublicWorkouts from "./pages/PublicWorkouts.jsx";
import PublicWorkoutDetail from "./pages/PublicWorkoutDetail.jsx";

// Panel za svoje treninge (member/admin)
import MyWorkouts from "./pages/MyWorkouts.jsx";
import CreateWorkout from "./pages/CreateWorkout.jsx";
import EditWorkout from "./pages/EditWorkout.jsx";

// Zaštita
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";

// Admin
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminUserDetail from "./pages/AdminUserDetails.jsx";
import AdminGoals from "./pages/AdminGoals.jsx";
import AdminGoalForm from "./pages/AdminGoalForm.jsx";

export default function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <NavBar />

      <Routes>
        {/* Public rute */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* WORKOUTS – dostupno SVIM ulogama (guest/member/admin) */}
        <Route
          path="/workouts"
          element={
            <ProtectedRoute>
              <RoleRoute allowed={["guest", "member", "admin"]}>
                <PublicWorkouts />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/workouts/:id"
          element={
            <ProtectedRoute>
              <RoleRoute allowed={["guest", "member", "admin"]}>
                <PublicWorkoutDetail />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* MOJI TRENINZI – samo member/admin */}
        <Route
          path="/users/workouts"
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

        {/* ADMIN */}
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
