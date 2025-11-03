// src/App.jsx
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import MyWorkouts from "./pages/MyWorkouts.jsx";
import CreateWorkout from "./pages/CreateWorkout.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";

export default function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <NavBar />
      <Routes>
        {/* public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Workouts panel: listanje mojih */}
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

        {/* fallback */}
        <Route path="*" element={<div className="container section">Not found</div>} />
      </Routes>
    </div>
  );
}
