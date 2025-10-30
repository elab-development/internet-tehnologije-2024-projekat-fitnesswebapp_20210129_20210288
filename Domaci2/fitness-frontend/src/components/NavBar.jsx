import { Link } from "react-router-dom";
import { getToken, getUser, isMemberOrAdmin, logoutToLogin } from "../utils/auth";

export default function NavBar() {
  const token = getToken();
  const user = getUser();

  const styles = {
    bar: { display: "flex", alignItems: "center", gap: 16, padding: "10px 16px", borderBottom: "1px solid #e5e5e5" },
    logo: { width: 36, height: 36, borderRadius: 6, background: "#ddd", display: "inline-block" },
    grow: { marginLeft: "auto" },
    link: { textDecoration: "none", color: "#333" },
    role: { opacity: 0.7, fontSize: 13, marginLeft: 8 }
  };

  return (
    <nav style={styles.bar}>
      {/* Placeholder za logo – kasnije samo zameni <span> sa <img src="URL" /> */}
      <span style={styles.logo} title="Logo" />
      <Link to="/" style={styles.link}>Home</Link>

      {token && <Link to="/profile" style={styles.link}>Profile</Link>}
      {token && isMemberOrAdmin() && <Link to="/workouts/new" style={styles.link}>Add Workout</Link>}

      <div style={styles.grow} />

      {!token ? (
        <Link to="/login" style={styles.link}>Login</Link>
      ) : (
        <>
          <span>Hi, {user?.name || "User"} <span style={styles.role}>({user?.role})</span></span>
          <button onClick={logoutToLogin} style={{ marginLeft: 10 }}>Logout</button>
        </>
      )}
    </nav>
  );
}
