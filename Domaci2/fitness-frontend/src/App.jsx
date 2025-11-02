import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import MyWorkouts from "./pages/MyWorkouts.jsx";
import CreateWorkout from "./pages/CreateWorkout.jsx"; 

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";



export default function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* zaštićen profil */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div className="container section">Not found</div>} />

        <Route
          path="/users/workouts"
          element={
            <ProtectedRoute>
              <RoleRoute>
                <MyWorkouts />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  );
}
