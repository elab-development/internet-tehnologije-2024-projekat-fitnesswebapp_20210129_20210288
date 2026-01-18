/**
 * PublicWorkoutDetail - Detalji treninga
 * Prikazuje detaljne informacije o jednom treningu
 * Dostupno svim korisnicima (guest/member/admin)
 */

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import CopyButton from "../../components/CopyButton.jsx";
import { fetchWorkout } from "../../api/workouts";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCountdown } from "../../hooks/useCountdown";

export default function PublicWorkoutDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const role = user?.role;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Workout timer - default 30 minutes
  const { timeLeft, isRunning, isFinished, start, pause, reset } = useCountdown(1800);

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

  const workoutText = `Workout: ${item.name ?? `Trening #${id}`}
Description: ${item.description ?? "Bez opisa"}
${item.duration != null ? `Duration: ${item.duration} min` : ""}${item.calories_burned != null ? ` | Calories: ${item.calories_burned} kcal` : ""}${item.status ? ` | Status: ${item.status}` : ""}`;

  return (
    <div className="container section" style={{ maxWidth: 720 }}>
      <div className="page-header">
        <h2>{item.name ?? `Trening #${id}`}</h2>
        <Link to="/workouts" className="btn btn-outline">Nazad</Link>
        <CopyButton textToCopy={workoutText} label="Kopiraj Trening" />
        {(role === "member" || role === "admin") && (
          <Link to={`/workouts/${id}/edit`} className="btn btn-outline">Uredi</Link>
        )}
      </div>

      <Card>
        <p style={{ marginTop: 0, opacity: 0.85 }}>
          {item.description ?? "Bez opisa."}
        </p>
        <div className="card-tags">
          {item.duration != null && <span className="user-pill">{item.duration} min</span>}
          {item.calories_burned != null && <span className="user-pill">{item.calories_burned} kcal</span>}
          {item.status && <span className="user-pill">Status: {item.status}</span>}
        </div>
      </Card>

      {/* Workout Timer */}
      <Card style={{ marginTop: "1.5rem" }}>
        <h3 style={{ marginTop: 0 }}>Tajmer za Trening</h3>
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <div style={{ fontSize: "3rem", fontWeight: "bold", fontFamily: "monospace", color: isFinished ? "#51cf66" : "#495057" }}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
          </div>
          {isFinished && <p style={{ color: "#51cf66", fontWeight: "bold" }}>🎉 Trening završen!</p>}
        </div>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
          {!isRunning ? (
            <Button onClick={start} disabled={isFinished}>Pokreni</Button>
          ) : (
            <Button onClick={pause} variant="outline">Pauziraj</Button>
          )}
          <Button onClick={() => reset()} variant="outline">Resetuj</Button>
        </div>
      </Card>
    </div>
  );
}
