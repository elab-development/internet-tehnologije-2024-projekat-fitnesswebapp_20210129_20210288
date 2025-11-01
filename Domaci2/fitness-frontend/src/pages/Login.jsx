import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import TextInput from "../components/ui/TextInput";

/**
 * Login stranica:
 * - "Continue as guest" (poziva /guest/login)
 * - Klasičan login (email + password) preko /login
 * - Minimalna validacija + lepši izgled preko naših UI komponenti
 */
export default function Login() {
  const { login, loginGuest } = useAuth();
  const nav = useNavigate();

  // lokalno stanje forme
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // helper – reset poruke kada krene nova akcija
  const resetError = () => setErr("");

  const handleGuest = async () => {
    resetError();
    setLoading(true);
    try {
      await loginGuest();
      nav("/profile"); // kad god uspemo, šaljemo na profil
    } catch (e) {
      setErr("Guest login nije uspeo. Proveri Laravel server.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetError();

    // jednostavna validacija
    if (!email || !password) {
      setErr("Unesi email i lozinku.");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      nav("/profile");
    } catch (e) {
      // backend vraća 401 za pogrešne kredencijale
      setErr("Neuspešna prijava. Proveri kredencijale.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section" style={{ maxWidth: 560 }}>
      <h2 style={{ marginTop: 0, marginBottom: 14 }}>Prijava</h2>

      {/* GUEST BLOK */}
      <Card style={{ marginBottom: 18 }}>
        <h3 style={{ marginTop: 0, marginBottom: 8 }}>Brzi ulaz (guest)</h3>
        <p style={{ marginTop: 0, opacity: 0.8 }}>
          Istraži aplikaciju bez registracije. Ovaj nalog ima read-only pristup.
        </p>
        <Button onClick={handleGuest} disabled={loading}>
          {loading ? "Ulazak..." : "Continue as guest"}
        </Button>
      </Card>

      {/* KLASIČAN LOGIN */}
      <Card>
        <h3 style={{ marginTop: 0, marginBottom: 8 }}>Prijava email/lozinka</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <TextInput
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={resetError}
              required
            />
            <TextInput
              label="Lozinka"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              onFocus={resetError}
              required
            />
          </div>

          {err && (
            <p style={{ color: "#ff6b6b", margin: "8px 0 0" }}>
              {err}
            </p>
          )}

          <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
            <Button type="submit" disabled={loading}>
              {loading ? "Prijavljivanje..." : "Login"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEmail("");
                setPass("");
                resetError();
              }}
            >
              Reset
            </Button>
          </div>
        </form>
      </Card>

      <p style={{ marginTop: 12, opacity: 0.7 }}>
        Napomena: za admin/member naloge koristi već kreirane korisnike iz back-enda.
      </p>
    </div>
  );
}
