// src/pages/MyWorkouts.jsx

// Panel sa listom korisnikovih treninga (member/admin).
// - GET /users/workouts (samo sopstveni treninzi)
// - DELETE /users/workouts/:id (brisanje uz potvrdu)

import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { fetchMyWorkouts, deleteWorkout } from "../api/workouts";

export default function MyWorkouts() {
  // --- Podaci ---
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- UI stanje ---
  const [err, setErr] = useState("");
  const [confirmId, setConfirmId] = useState(null); // id čiji delete potvrđujemo
  const [busyId, setBusyId] = useState(null);       // id koji se briše (spinner/disable)

  // --- Učitavanje liste ---
  const load = useCallback(async () => {
    setLoading(true);
    setErr("");
    try {
      const list = await fetchMyWorkouts(); // GET /users/workouts
      if (Array.isArray(list)) {
        setItems(list);
      } else if (list?.data && Array.isArray(list.data)) {
        setItems(list.data);
      } else {
        setItems([]); // fallback
      }
    } catch (e) {
      console.error("Greška u učitavanju:", e);
      setErr("Ne mogu da učitam tvoje treninge. Kreiraj trening ili pokušaj ponovo.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // --- Potvrđeno brisanje ---
  const doDelete = async () => {
    if (!confirmId) return;
    try {
      setBusyId(confirmId);
      await deleteWorkout(confirmId); // DELETE /users/workouts/:id
      setItems((prev) => prev.filter((x) => x.id !== confirmId));
      setConfirmId(null);
    } catch {
      alert("Brisanje nije uspelo. Pokušaj ponovo.");
    } finally {
      setBusyId(null);
    }
  };

  // --- Render stanja ---
  if (loading) {
    return (
      <div className="container section">
        <h2 style={{ marginTop: 0 }}>Moji treninzi</h2>
        <p>Učitavam…</p>
      </div>
    );
  }

  return (
    <div className="container section">
      {/* Naslov + dugme */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Moji treninzi</h2>
        <Link to="/workouts/new" className="btn">+ Novi trening</Link>
      </div>

      {/* Greška */}
      {err && (
        <Card>
          <p style={{ color: "#ff6b6b", margin: 0 }}>{err}</p>
          <div style={{ marginTop: 10 }}>
            <Button onClick={load}>Pokušaj ponovo</Button>
          </div>
        </Card>
      )}

      {/* Prazna lista */}
      {!err && items.length === 0 && (
        <Card>
          <p style={{ margin: 0, opacity: 0.85 }}>
            Još uvek nemaš nijedan trening. Klikni na <b>„+ Novi trening“</b> da dodaš prvi.
          </p>
        </Card>
      )}

      {/* Lista postojećih */}
      {!err && items.length > 0 && (
        <div className="grid-3">
          {items.map((w) => (
            <Card key={w.id}>
              <h3 style={{ marginTop: 0 }}>{w.name || "Bez naziva"}</h3>

              <p style={{ opacity: 0.8, margin: "6px 0 10px" }}>
                {w.description || "Bez opisa."}
              </p>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {w.duration != null && <span className="user-pill">⏱ {w.duration} min</span>}
                {w.calories_burned != null && <span className="user-pill">🔥 {w.calories_burned} kcal</span>}
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <Link to={`/workouts/${w.id}/edit`} className="btn btn-outline">
                  Uredi
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => setConfirmId(w.id)}
                  disabled={busyId === w.id}
                >
                  {busyId === w.id ? "Brišem..." : "Obriši"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal za potvrdu */}
      <Modal
        open={!!confirmId}
        title="Potvrda brisanja"
        onClose={() => setConfirmId(null)}
      >
        <p>Da li sigurno želiš da obrišeš ovaj trening?</p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
          <button className="btn btn-outline" onClick={() => setConfirmId(null)}>Ne</button>
          <button className="btn" onClick={doDelete}>Da, obriši</button>
        </div>
      </Modal>
    </div>
  );
}
