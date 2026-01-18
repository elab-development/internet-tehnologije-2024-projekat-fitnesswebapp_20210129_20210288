import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import LoginGreeting from "./components/LoginGreeting.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";

/* PUBLIC WORKOUTS  */
import PublicWorkouts from "./pages/workouts/PublicWorkouts.jsx";
import PublicWorkoutDetail from "./pages/workouts/PublicWorkoutDetail.jsx";

/* MY WORKOUTS  */
import MyWorkouts from "./pages/workouts/MyWorkouts.jsx";
import CreateWorkout from "./pages/workouts/CreateWorkout.jsx";
import EditWorkout from "./pages/workouts/EditWorkout.jsx";

/* ZAŠTITA */
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";

/* ADMIN */
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminUserDetail from "./pages/admin/AdminUserDetails.jsx";
import AdminGoals from "./pages/admin/AdminGoals.jsx";
import AdminGoalForm from "./pages/admin/AdminGoalForm.jsx";

/*EXERCISES */
import Exercises from "./pages/exercises/Exercises.jsx";
import ExerciseForm from "./pages/exercises/ExerciseForm.jsx";

export default function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <NavBar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Workouts dostupno svima (guest/member/admin) */}
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

        {/* My workouts (member/admin) */}
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

        {/* Exercises (member/admin) */}
        <Route
          path="/exercises"
          element={
            <ProtectedRoute>
              <RoleRoute allowed={["member", "admin"]}>
                <Exercises />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/exercises/new"
          element={
            <ProtectedRoute>
              <RoleRoute allowed={["member", "admin"]}>
                <ExerciseForm />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/exercises/:id/edit"
          element={
            <ProtectedRoute>
              <RoleRoute allowed={["member", "admin"]}>
                <ExerciseForm />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Admin */}
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

        {/* Ako pukne nešto */}
        <Route path="*" element={<div className="container section">Not found</div>} />
      </Routes>

      <ScrollToTop />
      <LoginGreeting />
    </div>
  );
}
