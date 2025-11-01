// src/components/NavBar.jsx
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { getToken, getUser, isMemberOrAdmin, logoutToLogin } from "../utils/auth";

export default function NavBar() {
  const token = getToken();
  const user = getUser();

  return (
    <header className="navbar">
      <div className="container nav-inner">
        {/* brand + logo */}
        <Link to="/" className="brand">
          <img src={logo} alt="Reborn Fitness" className="brand-logo" />
          <span className="brand-text">REBORN fitness</span>
        </Link>

        {/* glavna navigacija */}
        <nav className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) => "nav-link" + (isActive ? " is-active" : "")}
          >
            Home
          </NavLink>

          {token && (
            <NavLink
              to="/profile"
              className={({ isActive }) => "nav-link" + (isActive ? " is-active" : "")}
            >
              Profile
            </NavLink>
          )}

          {token && isMemberOrAdmin() && (
            <NavLink
              to="/workouts/new"
              className={({ isActive }) => "nav-link" + (isActive ? " is-active" : "")}
            >
              Add Workout
            </NavLink>
          )}
        </nav>

        {/* desna strana: login / user + logout */}
        <div className="nav-right">
          {!token ? (
            <Link to="/login" className="btn btn-small">
              Login
            </Link>
          ) : (
            <>
              <span className="user-pill">
                {user?.name || "User"} <span className="role">({user?.role})</span>
              </span>
              <button className="btn btn-ghost btn-small" onClick={logoutToLogin}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
