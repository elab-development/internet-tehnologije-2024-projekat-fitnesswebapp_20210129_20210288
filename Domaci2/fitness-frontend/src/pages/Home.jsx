import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div style={{padding:24}}>
      <h1>Fitness App</h1>
      <p>Mini demo: login/guest, listanje treninga, i kreiranje treninga na profilu (member/admin).</p>
      {!user ? (
        <p><Link to="/login">Uloguj se</Link> ili nastavi kao gost.</p>
      ) : (
        <p>Ćao {user.name}! Idi na <Link to="/workouts">Workouts</Link> ili <Link to="/profile">Profile</Link>.</p>
      )}
    </div>
  );
}
