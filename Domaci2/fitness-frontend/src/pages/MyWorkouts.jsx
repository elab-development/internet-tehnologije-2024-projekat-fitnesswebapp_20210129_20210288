import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { fetchMyWorkouts, deleteWorkout } from "../api/workouts.js";

export default function MyWorkouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // modal za potvrdu brisanja
  const [confirmId, setConfirmId] = useState(null);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const list = await fetchMyWorkouts();
        if (active) setItems(list);
      } catch (e) {
        setErr("Ne mogu da učitam tvoje treninge. Pokušaj ponovo.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => (active = false);
  }, []);

  const doDelete = async () => {
    if (!confirmId) return;
    try {
      setBusyId(confirmId);
      await deleteWorkout(confirmId);
      setItems(prev => prev.filter(x => x.id !== confirmId));
      setConfirmId(null);
    } catch (e) {
      alert("Brisanje nije uspelo. Pokušaj ponovo.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="container section">
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
        <h2 style={{ margin:0 }}>Moji treninzi</h2>
        <Link to="/workouts/new" className="btn">+ Novi</Link>
      </div>

      {loading && <p>Učitavam…</p>}
      {err && <p style={{ color:"#ff6b6b" }}>{err}</p>}

      <div className="grid-3">
        {items.map(w => (
          <Card key={w.id}>
            <h3 style={{ marginTop: 0 }}>{w.name || "Bez naziva"}</h3>
            <p style={{ opacity: 0.8, margin: "6px 0 10px" }}>{w.description || "Bez opisa."}</p>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {w.duration ? <span className="user-pill">⏱ {w.duration} min</span> : null}
              {w.calories_burned ? <span className="user-pill">🔥 {w.calories_burned} kcal</span> : null}
            </div>

            <div style={{ display:"flex", gap:8, marginTop: 12 }}>
              <Link to={`/workouts/${w.id}/edit`} className="btn btn-outline">Uredi</Link>
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

      <Modal
        open={!!confirmId}
        title="Potvrda brisanja"
        onClose={() => setConfirmId(null)}
      >
        <p>Da li sigurno želiš da obrišeš ovaj trening?</p>
        <div style={{ display:"flex", justifyContent:"flex-end", gap:10, marginTop:12 }}>
          <button className="btn btn-outline" onClick={() => setConfirmId(null)}>Ne</button>
          <button className="btn" onClick={doDelete}>Da, obriši</button>
        </div>
      </Modal>
    </div>
  );
}
