// src/pages/AdminUsers.jsx

import { useEffect, useState, useCallback, useMemo } from "react";
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

  // PAGINACIJA
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const load = useCallback(async () => {
    try {
      setErr("");
      setLoading(true);
      const list = await fetchUsers();
      setItems(Array.isArray(list) ? list : []);
      setPage(1); // reset na prvu stranu pri osvežavanju
    } catch {
      setErr("Ne mogu da učitam korisnike. Proveri backend ili privilegije.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const doDelete = async () => {
    if (!confirmId) return;
    try {
      setBusyId(confirmId);
      await deleteUser(confirmId);
      setItems((prev) => prev.filter((u) => String(u.id) !== String(confirmId)));
      setConfirmId(null);
    } catch {
      alert("Brisanje korisnika nije uspelo.");
    } finally {
      setBusyId(null);
    }
  };

  // LOGIKA PAGINACIJE
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const pagedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  // Ako obrišemo poslednji element na strani, a strana više ne postoji, vrati se na prethodnu
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  // Eksport funkcije

  const exportToCSV = () => {
    if (!items.length) {
      alert("Nema podataka za eksport.");
      return;
    }
    const headers = ["ID", "Ime", "Email", "Uloga"];
    const rows = items.map((u) => [u.id, u.name, u.email, u.role]);

    const csvContent = [headers, ...rows]
      .map((e) => e.map((v) => `"${v ?? ""}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users_export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToTXT = () => {
    if (!items.length) {
      alert("Nema podataka za eksport.");
      return;
    }
    const text = items
      .map(
        (u) => `ID: ${u.id} | Ime: ${u.name} | Email: ${u.email} | Uloga: ${u.role}`
      )
      .join("\n");

    const blob = new Blob([text], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users_export.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container section">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h2 style={{ margin: 0 }}>Admin · Users</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="outline" onClick={load}>
            Osveži
          </Button>
          <Button variant="outline" onClick={exportToCSV}>
            Eksportuj CSV
          </Button>
          <Button variant="outline" onClick={exportToTXT}>
            Eksportuj TXT
          </Button>
        </div>
      </div>

      {loading && <p>Učitavam korisnike…</p>}
      {err && <p style={{ color: "#ff6b6b" }}>{err}</p>}

      {!loading && !err && (
        <Card>
          {!items.length ? (
            <p style={{ margin: 0, opacity: 0.85 }}>
              Trenutno nema korisnika za prikaz.
            </p>
          ) : (
            <>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: 8 }}>ID</th>
                      <th style={{ textAlign: "left", padding: 8 }}>Ime</th>
                      <th style={{ textAlign: "left", padding: 8 }}>Email</th>
                      <th style={{ textAlign: "left", padding: 8 }}>Uloga</th>
                      <th style={{ textAlign: "left", padding: 8 }}>Akcije</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedItems.map((u) => (
                      <tr
                        key={u.id}
                        style={{
                          borderTop: "1px solid rgba(255,255,255,.08)",
                        }}
                      >
                        <td style={{ padding: 8 }}>{u.id}</td>
                        <td style={{ padding: 8 }}>{u.name || "-"}</td>
                        <td style={{ padding: 8 }}>{u.email || "-"}</td>
                        <td style={{ padding: 8 }}>{u.role || "-"}</td>
                        <td
                          style={{
                            padding: 8,
                            display: "flex",
                            gap: 8,
                            flexWrap: "wrap",
                          }}
                        >
                          <Link
                            className="btn btn-outline"
                            to={`/admin/users/${u.id}`}
                            state={{ user: u }}
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

              {/* PAGINACIONE KONTROLE */}
              {totalPages > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 16,
                  }}
                >
                  <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Nazad
                  </Button>
                  <span>
                    Strana {page} od {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Napred
                  </Button>
                </div>
              )}
            </>
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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 12,
          }}
        >
          <button className="btn btn-outline" onClick={() => setConfirmId(null)}>
            Ne
          </button>
          <button className="btn" onClick={doDelete}>
            Da, obriši
          </button>
        </div>
      </Modal>
    </div>
  );
}
