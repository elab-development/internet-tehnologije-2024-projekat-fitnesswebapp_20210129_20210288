import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { loginGuest } = useAuth();
  const nav = useNavigate();

  const handleGuest = async () => {
    try {
      // ovo već pogađa backend ako .env postoji i Laravel radi
      await loginGuest();
      nav("/protected");
    } catch (e) {
      alert("Guest login erro");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Login (test)</h2>
      <button onClick={handleGuest}>Continue as guest</button>
      <p style={{ opacity: 0.7 }}>Test /protected.</p>
    </div>
  );
}
