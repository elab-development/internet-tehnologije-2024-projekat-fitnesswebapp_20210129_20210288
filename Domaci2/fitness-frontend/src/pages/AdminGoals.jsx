import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { fetchGoals, deleteGoal } from "../api/goals";

function pickTitle(g) {
  return g?.title ?? g?.name ?? g?.goal ?? "(bez naziva)";
}
function pickDate(g) {
  return (
    g?.target_date ??
    g?.due_date ??
    g?.deadline ??
    g?.deadline_at ??
    g?.targetDate ??
    g?.dueDate ??
    null
  );
}
function pickUser(g) {
  return g?.user?.name ?? g?.user_name ?? g?.userId ?? g?.user_id ?? "-";
}

export default function AdminGoals() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [confirmId, setConfirmId] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    try {
      setErr("");
      setLoading(true);
      const list = await fetchGoals();
      setItems(Array.isArray(list) ? list : []);
    } catch {
      setErr("Ne mogu da učitam ciljeve. Proveri backend ili privilegije.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const doDelete = async () => {
    if (!confirmId) return;
    try {
      setBusyId(confirmId);
      await deleteGoal(confirmId);
      setItems(prev => prev.filter(x => String(x.id) !== String(confirmId)));
      setConfirmId(null);
    } catch {
      alert("Brisanje cilja nije uspelo.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="container section">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <h2 style={{ margin:0 }}>Admin · Goals</h2>
        <div style={{ display:"flex", gap:8 }}>
          <Link to="/goals/new" className="btn">+ Novi cilj</Link>
          <Button variant="outline" onClick={load}>Osveži</Button>
        </div>
      </div>

      {loading && <p>Učitavam ciljeve…</p>}
      {err && <p style={{ color:"#ff6b6b" }}>{err}</p>}

      {!loading && !err && (
        <Card>
          {!items.length ? (
            <p style={{ margin: 0, opacity:.85 }}>Trenutno nema ciljeva.</p>
          ) : (
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign:"left", padding:8 }}>ID</th>
                    <th style={{ textAlign:"left", padding:8 }}>Naziv</th>
                    <th style={{ textAlign:"left", padding:8 }}>Korisnik</th>
                    <th style={{ textAlign:"left", padding:8 }}>Rok</th>
                    <th style={{ textAlign:"left", padding:8 }}>Akcije</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(g => (
                    <tr key={g.id} style={{ borderTop:"1px solid rgba(255,255,255,.08)" }}>
                      <td style={{ padding:8 }}>{g.id}</td>
                      <td style={{ padding:8 }}>{pickTitle(g)}</td>
                      <td style={{ padding:8 }}>{pickUser(g)}</td>
                      <td style={{ padding:8 }}>{pickDate(g) ?? "-"}</td>
                      <td style={{ padding:8, display:"flex", gap:8, flexWrap:"wrap" }}>
                        <Link className="btn btn-outline" to={`/goals/${g.id}/edit`} state={{ goal: g }}>
                          Uredi
                        </Link>
                        <Button
                          variant="ghost"
                          disabled={busyId === g.id}
                          onClick={() => setConfirmId(g.id)}
                        >
                          {busyId === g.id ? "Brišem…" : "Obriši"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      <Modal
        open={!!confirmId}
        title="Potvrda brisanja cilja"
        onClose={() => setConfirmId(null)}
      >
        <p>Da li sigurno želiš da obrišeš ovaj cilj?</p>
        <div style={{ display:"flex", justifyContent:"flex-end", gap:10, marginTop:12 }}>
          <button className="btn btn-outline" onClick={() => setConfirmId(null)}>Ne</button>
          <button className="btn" onClick={doDelete}>Da, obriši</button>
        </div>
      </Modal>
    </div>
  );
}
