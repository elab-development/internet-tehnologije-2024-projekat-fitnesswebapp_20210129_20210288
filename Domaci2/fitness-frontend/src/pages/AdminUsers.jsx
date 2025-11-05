// src/pages/AdminUsers.jsx
// Admin: lista korisnika + brisanje, link ka detalju.
// - GET  /admin/users
// - DELETE /admin/users/:id

import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { fetchUsers, deleteUser } from "../api/admin";

export default function AdminUsers() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [confirmId, setConfirmId] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    try {
      setErr("");
      setLoading(true);
      const list = await fetchUsers();
      setItems(Array.isArray(list) ? list : []);
    } catch {
      setErr("Ne mogu da učitam korisnike. Proveri backend ili privilegije.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const doDelete = async () => {
    if (!confirmId) return;
    try {
      setBusyId(confirmId);
      await deleteUser(confirmId);
      setItems(prev => prev.filter(u => String(u.id) !== String(confirmId)));
      setConfirmId(null);
    } catch {
      alert("Brisanje korisnika nije uspelo.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="container section">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <h2 style={{ margin:0 }}>Admin · Users</h2>
        <Button variant="outline" onClick={load}>Osveži</Button>
      </div>

      {loading && <p>Učitavam korisnike…</p>}
      {err && <p style={{ color:"#ff6b6b" }}>{err}</p>}

      {!loading && !err && (
        <Card>
          {!items.length ? (
            <p style={{ margin: 0, opacity:.85 }}>Trenutno nema korisnika za prikaz.</p>
          ) : (
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign:"left", padding:8 }}>ID</th>
                    <th style={{ textAlign:"left", padding:8 }}>Ime</th>
                    <th style={{ textAlign:"left", padding:8 }}>Email</th>
                    <th style={{ textAlign:"left", padding:8 }}>Uloga</th>
                    <th style={{ textAlign:"left", padding:8 }}>Akcije</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(u => (
                    <tr key={u.id} style={{ borderTop:"1px solid rgba(255,255,255,.08)" }}>
                      <td style={{ padding:8 }}>{u.id}</td>
                      <td style={{ padding:8 }}>{u.name || "-"}</td>
                      <td style={{ padding:8 }}>{u.email || "-"}</td>
                      <td style={{ padding:8 }}>{u.role || "-"}</td>
                      <td style={{ padding:8, display:"flex", gap:8, flexWrap:"wrap" }}>
                        <Link
                          className="btn btn-outline"
                          to={`/admin/users/${u.id}`}
                          state={{ user: u }} // prosledi podatke detail stranici
                        >
                          Detalji
                        </Link>
                        <Button
                          variant="ghost"
                          disabled={busyId === u.id}
                          onClick={() => setConfirmId(u.id)}
                        >
                          {busyId === u.id ? "Brišem…" : "Obriši"}
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

      {/* Confirm delete */}
      <Modal
        open={!!confirmId}
        title="Potvrda brisanja korisnika"
        onClose={() => setConfirmId(null)}
      >
        <p>Da li sigurno želiš da obrišeš korisnika?</p>
        <div style={{ display:"flex", justifyContent:"flex-end", gap:10, marginTop:12 }}>
          <button className="btn btn-outline" onClick={() => setConfirmId(null)}>Ne</button>
          <button className="btn" onClick={doDelete}>Da, obriši</button>
        </div>
      </Modal>
    </div>
  );
}
