/**
 * PublicWorkouts - Javna lista treninga
 * Prikazuje sve dostupne treninge za sve korisnike (guest/member/admin)
 * Omogućava pregled, kreiranje, izmenu i brisanje treninga
 */

import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { fetchWorkouts, deleteWorkout } from "../../api/workouts";
import { useAuth } from "../../context/AuthContext.jsx";

export default function PublicWorkouts() {
  const { user } = useAuth();
  const role = user?.role; // "guest" | "member" | "admin"

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // delete
  const [confirmId, setConfirmId] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    try {
      setErr("");
      setLoading(true);
      const list = await fetchWorkouts();
      setItems(Array.isArray(list) ? list : (list?.data ?? []));
    } catch {
      setErr("Ne mogu da učitam treninge.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const doDelete = async () => {
    if (!confirmId) return;
    try {
      setBusyId(confirmId);
      await deleteWorkout(confirmId); // DELETE /users/workouts/:id
      setItems(prev => prev.filter(x => String(x.id) !== String(confirmId)));
      setConfirmId(null);
    } catch {
      alert("Brisanje nije uspelo. Pokušaj ponovo.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="container section">
      <div className="page-header">
        <h2>Workouts</h2>

        {(role === "member" || role === "admin") && (
          <Link to="/workouts/new" className="btn">+ Novi trening</Link>
        )}

        <Button variant="outline" onClick={load}>Osveži</Button>
      </div>

      {loading && <p>Učitavam…</p>}
      {err && <p style={{ color: "#ff6b6b" }}>{err}</p>}

      {!loading && !err && items.length === 0 && (
        <Card>
          <p style={{ margin: 0, opacity: 0.85 }}>
            Nema treninga za prikaz.
            {(role === "member" || role === "admin")
              ? " Dodaj svoj prvi trening."
              : " Uloguj se kao member da dodaješ svoje treninge."}
          </p>
        </Card>
      )}

      <div className="grid-3">
        {items.map((w) => {
          const isOwner = user?.id && w?.user_id === user.id;
          return (
            <Card key={w.id}>
              <h3 style={{ marginTop: 0 }}>{w.name ?? "Bez naziva"}</h3>
              <p style={{ opacity: 0.8, margin: "6px 0 10px" }}>
                {w.description ?? "Bez opisa."}
              </p>

              <div className="card-tags">
                {w.duration != null && <span className="user-pill">{w.duration} min</span>}
                {w.calories_burned != null && <span className="user-pill">{w.calories_burned} kcal</span>}
                {w.status && <span className="user-pill">Status: {w.status}</span>} {/* NOVO */}
              </div>

              <div className="card-actions">
                <Link to={`/workouts/${w.id}`} className="btn btn-outline">Detalj</Link>

                {(role === "member" || role === "admin") && isOwner && (
                  <>
                    <Link to={`/workouts/${w.id}/edit`} className="btn btn-outline">Uredi</Link>
                    <Button
                      variant="ghost"
                      onClick={() => setConfirmId(w.id)}
                      disabled={busyId === w.id}
                    >
                      {busyId === w.id ? "Brišem…" : "Obriši"}
                    </Button>
                  </>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <Modal
        open={!!confirmId}
        title="Potvrda brisanja"
        onClose={() => setConfirmId(null)}
      >
        <p>Da li sigurno želiš da obrišeš ovaj trening?</p>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={() => setConfirmId(null)}>Ne</button>
          <button className="btn" onClick={doDelete}>Da, obriši</button>
        </div>
      </Modal>
    </div>
  );
}
