// src/components/NavBar.jsx
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function NavBar() {
  const nav = useNavigate();
  const { token, user, logout } = useAuth();
  const role = user?.role; // "member" | "admin" | "guest?"

  return (
    <header className="navbar">
      <div className="container nav-inner">
        {/* LOGO + naziv */}
        <Link to="/" className="brand">
          <img src={logo} alt="Rebel Fitness" className="brand-logo" />
          <span className="brand-text">REBEL fitness</span>
        </Link>

        {/* Glavni linkovi */}
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " is-active" : "")}>
            Home
          </NavLink>

          {/* Workouts – dostupno za member/admin */}
          {(role === "member" || role === "admin") && (
            <NavLink to="/workouts" className={({ isActive }) => "nav-link" + (isActive ? " is-active" : "")}>
              Workouts
            </NavLink>
          )}

          {/* Exercises – prema tvojim rutama: CRUD je dostupan member/admin */}
          {(role === "member" || role === "admin") && (
            <NavLink to="/exercises" className={({ isActive }) => "nav-link" + (isActive ? " is-active" : "")}>
              Exercises
            </NavLink>
          )}

          {/* Goals – samo admin */}
          {role === "admin" && (
            <NavLink to="/goals" className={({ isActive }) => "nav-link" + (isActive ? " is-active" : "")}>
              Goals
            </NavLink>
          )}

          {/* Profil – ako si ulogovan */}
          {token && (
            <NavLink to="/profile" className={({ isActive }) => "nav-link" + (isActive ? " is-active" : "")}>
              Profile
            </NavLink>
          )}
        </nav>

        {/* desno: login / user + logout */}
        <div className="nav-right">
          {!token ? (
            <Link to="/login" className="btn btn-small">Login</Link>
          ) : (
            <>
              <span className="user-pill">
                {user?.name ?? user?.email ?? "User"} <span className="role">({role})</span>
              </span>
              <button
                className="btn-ghost btn-small"
                onClick={async () => { await logout(); nav("/"); }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
