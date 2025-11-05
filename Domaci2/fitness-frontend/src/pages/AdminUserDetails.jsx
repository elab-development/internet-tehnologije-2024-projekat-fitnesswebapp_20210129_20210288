// src/pages/AdminUserDetails.jsx
// Admin: detalji korisnika (read-only).
// Backend nema GET /admin/users/:id pa radimo fetchUsers() i filtriramo.

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { fetchUserById } from "../api/admin";

export default function AdminUserDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const location = useLocation();

  // ako si došao sa liste, imamo user-a u state-u
  const initialUser = location.state?.user || null;

  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(!initialUser);
  const [err, setErr] = useState("");

  useEffect(() => {
    let active = true;
    if (initialUser) return; // već imamo podatke

    (async () => {
      try {
        setErr("");
        setLoading(true);
        const u = await fetchUserById(id);
        if (!active) return;
        if (!u) {
          setErr("Korisnik nije pronađen.");
        } else {
          setUser(u);
        }
      } catch {
        if (active) setErr("Ne mogu da učitam korisnika.");
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => { active = false; };
  }, [id, initialUser]);

  return (
    <div className="container section" style={{ maxWidth: 760 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
        <h2 style={{ margin:0 }}>Admin · User detalj</h2>
        <div style={{ display:"flex", gap:8 }}>
          <Button variant="outline" onClick={() => nav(-1)}>Nazad</Button>
          <Link to="/admin/users" className="btn btn-outline">Lista</Link>
        </div>
      </div>

      {loading && <p>Učitavam…</p>}
      {err && <p style={{ color:"#ff6b6b" }}>{err}</p>}

      {!loading && !err && user && (
        <Card>
          <div style={{ display:"grid", gap:10 }}>
            <div>
              <div style={{ opacity:.7, fontSize:13 }}>ID</div>
              <div>{user.id}</div>
            </div>
            <div>
              <div style={{ opacity:.7, fontSize:13 }}>Ime</div>
              <div>{user.name || "-"}</div>
            </div>
            <div>
              <div style={{ opacity:.7, fontSize:13 }}>Email</div>
              <div>{user.email || "-"}</div>
            </div>
            <div>
              <div style={{ opacity:.7, fontSize:13 }}>Uloga</div>
              <div>{user.role || "-"}</div>
            </div>
            {/* Dodaj polja koja backend vraća (npr. fitness_level, created_at...) */}
            {user.fitness_level && (
              <div>
                <div style={{ opacity:.7, fontSize:13 }}>Fitness level</div>
                <div>{user.fitness_level}</div>
              </div>
            )}
            {user.created_at && (
              <div>
                <div style={{ opacity:.7, fontSize:13 }}>Kreiran</div>
                <div>{user.created_at}</div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
