import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import TextInput from "../components/ui/TextInput";
import SelectInput from "../components/ui/SelectInput";

export default function Login() {
  const { login, loginGuest, register } = useAuth();
  const nav = useNavigate();

  // login state
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  // register state
  const [rName, setRName] = useState("");
  const [rEmail, setREmail] = useState("");
  const [rPass, setRPass] = useState("");
  const [rRole, setRRole] = useState("member");
  const [rLevel, setRLevel] = useState("beginner");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const resetError = () => setErr("");

  const handleGuest = async () => {
    resetError(); setLoading(true);
    try {
      await loginGuest();
      nav("/"); 
    } catch {
      setErr("Guest login nije uspeo. Proveri Laravel server.");
    } finally { setLoading(false); }
  };

  const handleLogin = async (e) => {
    e.preventDefault(); resetError();
    if (!email || !password) return setErr("Unesi email i lozinku.");
    setLoading(true);
    try {
      await login(email, password);
      nav("/");
    } catch {
      setErr("Neuspešna prijava. Proveri kredencijale.");
    } finally { setLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault(); resetError();
    if (!rName || !rEmail || !rPass) return setErr("Popuni sva polja za registraciju.");
    setLoading(true);
    try {
      await register({
        name: rName,
        email: rEmail,
        password: rPass,
        role: rRole.toLowerCase(),
        fitness_level: rLevel.toLowerCase(),
      });
      nav("/");
    } catch {
      setErr("Registracija nije uspela. Proveri da li email već postoji.");
    } finally { setLoading(false); }
  };

  return (
    <div className="container section" style={{ maxWidth: 1100 }}>
      <h2 style={{ marginTop: 0, marginBottom: 14 }}>Pristup nalogu</h2>

      <div className="grid-3">
        {/* GUEST */}
        <Card>
          <h3>Brzi ulaz (guest)</h3>
          <p style={{ opacity: .8 }}>Istraži aplikaciju bez registracije. Nećeš moći da sačuvaš promene.</p>
          <Button onClick={handleGuest} disabled={loading}>Nastavi kao gost</Button>
        </Card>

        {/* LOGIN */}
        <Card>
          <h3>Prijava</h3>
          <form onSubmit={handleLogin}>
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                onFocus={resetError}
                required
              />
            </div>
            <div className="field">
              <label>Lozinka</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e)=>setPass(e.target.value)}
                onFocus={resetError}
                required
              />
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <Button type="submit" disabled={loading}>Login</Button>
              <Button type="button" variant="outline" onClick={()=>{setEmail("");setPass("");}}>
                Reset
              </Button>
            </div>
          </form>
        </Card>

        {/* REGISTER */}
        <Card>
          <h3>Registracija</h3>
          <form onSubmit={handleRegister}>
            <div className="field">
              <label>Ime i prezime</label>
              <input value={rName} onChange={(e)=>setRName(e.target.value)} placeholder="Vaše ime" required />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" value={rEmail} onChange={(e)=>setREmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div className="field">
              <label>Lozinka</label>
              <input type="password" value={rPass} onChange={(e)=>setRPass(e.target.value)} placeholder="••••••••" required />
            </div>
            <div className="field">
              <label>Uloga</label>
              <select value={rRole} onChange={(e)=>setRRole(e.target.value)}>
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="field">
              <label>Fitness nivo</label>
              <select value={rLevel} onChange={(e)=>setRLevel(e.target.value)}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <Button type="submit" disabled={loading}>Registruj se</Button>
              <Button
                type="button"
                variant="outline"
                onClick={()=>{ setRName(""); setREmail(""); setRPass(""); setRRole("member"); setRLevel("beginner"); }}
              >
                Reset
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {err && <p style={{ color:"#ff6b6b", marginTop:14 }}>{err}</p>}
    </div>
  );
}
