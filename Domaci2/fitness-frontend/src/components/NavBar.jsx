import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

/**
 * NavBar:
 * - čita token i user iz globalnog AuthContext-a, ne iz localStorage helpera
 * - prikazuje ime (i ulogu) nakon logovanja bez reload-a
 * - logout -> vrati na Home
 */
export default function NavBar() {
  const nav = useNavigate();
  const { token, user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="container nav-inner">
        {/* LOGO I NAZIV */}
        <Link to="/" className="brand">
          <img src={logo} alt="Rebel Fitness" className="brand-logo" />
          <span className="brand-text">REBORN fitness</span>
        </Link>

        {/* GLAVNI DUGMICI */}
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " is-active" : "")}>
            Home
          </NavLink>

          {token && (
            <NavLink to="/profile" className={({ isActive }) => "nav-link" + (isActive ? " is-active" : "")}>
              Profile
            </NavLink>
          )}

          {token && (user?.role === "member" || user?.role === "admin") && (
            <NavLink to="/workouts/new" className={({ isActive }) => "nav-link" + (isActive ? " is-active" : "")}>
              Add Workout
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
                {user?.name ?? "User"} <span className="role">({user?.role})</span>
              </span>
              <button
                className="btn-ghost btn-small"
                onClick={async () => {
                  await logout();
                  nav("/"); 
                }}
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
