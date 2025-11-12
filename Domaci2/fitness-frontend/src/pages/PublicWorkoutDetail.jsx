// src/pages/PublicWorkoutDetail.jsx
//
// Detalj treninga (guest/member/admin).

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { fetchWorkout } from "../api/workouts";
import { useAuth } from "../context/AuthContext";

export default function PublicWorkoutDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const role = user?.role;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setErr("");
        setLoading(true);
        const data = await fetchWorkout(id);
        if (!active) return;
        setItem(data?.data ?? data ?? null);
      } catch {
        if (active) setErr("Ne mogu da učitam trening.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="container section">
        <h2 style={{ marginTop: 0 }}>Trening #{id}</h2>
        <p>Učitavam…</p>
      </div>
    );
  }

  if (err || !item) {
    return (
      <div className="container section">
        <h2 style={{ marginTop: 0 }}>Trening #{id}</h2>
        <p style={{ color: "#ff6b6b" }}>{err || "Nije pronađen."}</p>
        <Link to="/workouts" className="btn btn-outline">Nazad</Link>
      </div>
    );
  }

  return (
    <div className="container section" style={{ maxWidth: 720 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>{item.name ?? `Trening #${id}`}</h2>
        <Link to="/workouts" className="btn btn-outline">Nazad</Link>
        {(role === "member" || role === "admin") && (
          <Link to={`/workouts/${id}/edit`} className="btn btn-outline">Uredi</Link>
        )}
      </div>

      <Card>
        <p style={{ marginTop: 0, opacity: 0.85 }}>
          {item.description ?? "Bez opisa."}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
          {item.duration != null && <span className="user-pill">{item.duration} min</span>}
          {item.calories_burned != null && <span className="user-pill">{item.calories_burned} kcal</span>}
          {item.status && <span className="user-pill">Status: {item.status}</span>} {/* NOVO */}
        </div>
      </Card>
    </div>
  );
}
