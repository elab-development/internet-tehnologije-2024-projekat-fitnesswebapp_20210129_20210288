// Lista vežbi — sada koristi backend paginaciju i filtriranje (ali UI ostaje isti).

import { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import TextInput from "../components/ui/TextInput";
import SelectInput from "../components/ui/SelectInput";
import { fetchExercises, deleteExercise } from "../api/exercises";
import { useAuth } from "../context/AuthContext";

const TYPE_OPTIONS = [
  { value: "", label: "— svi tipovi —" },
  { value: "cardio", label: "cardio" },
  { value: "strength", label: "strength" },
  { value: "flexibility", label: "flexibility" },
];

const SORT_BY_OPTIONS = [
  { value: "name", label: "naziv" },
  { value: "type", label: "tip" },
  { value: "reps_or_time", label: "ponavljanja/vreme" },
  { value: "id", label: "ID" },
];

const PAGE_SIZE_OPTIONS = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 20, label: "20" },
];

function pickWorkoutName(ex) {
  return ex?.workout?.name ?? (ex?.workout_id != null ? `#${ex.workout_id}` : "-");
}

export default function Exercises() {
  const { user } = useAuth();
  const role = user?.role;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // FILTRI (ista UI logika — samo backend sada filtrira)
  const [typeFilter, setTypeFilter] = useState("");
  const [query, setQuery] = useState("");
  const [showMineOnly, setShowMineOnly] = useState(false);

  // SORT (isto kao pre)
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  // PAGINACIJA (ali sada backend vraća total + last_page)
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // DELETE modal
  const [confirmId, setConfirmId] = useState(null);
  const [busyId, setBusyId] = useState(null);

  // BACKEND LOAD
  const load = useCallback(async () => {
    try {
      setErr("");
      setLoading(true);

      const res = await fetchExercises({
        page,
        per_page: pageSize,
        search: query.trim() || undefined,
        type: typeFilter || undefined,
        mine: showMineOnly ? 1 : 0,
        sort: sortBy,
        dir: sortDir,
      });

      // Laravel paginator
      setItems(res.data ?? []);
      setTotal(res.total ?? 0);
      setTotalPages(res.last_page ?? 1);
    } catch {
      setErr("Ne mogu da učitam vežbe.");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, query, typeFilter, showMineOnly, sortBy, sortDir]);

  useEffect(() => {
    load();
  }, [load]);

  // DELETE handler
  const doDelete = async () => {
    if (!confirmId) return;
    try {
      setBusyId(confirmId);
      await deleteExercise(confirmId);
      setConfirmId(null);
      load(); // ponovo učitaj
    } catch {
      alert("Brisanje nije uspelo.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="container section">
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 12,
          flexWrap: "wrap",
        }}
      >
        <h2 style={{ margin: 0 }}>Exercises</h2>

        {(role === "member" || role === "admin") && (
          <Link to="/exercises/new" className="btn">+ Nova vežba</Link>
        )}

        <Button variant="outline" onClick={load}>Osveži</Button>

        {/* FILTERI — UI NE MENJAMO */}
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexWrap: "wrap",
            marginLeft: "auto",
          }}
        >
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="checkbox"
              checked={showMineOnly}
              onChange={(e) => {
                setShowMineOnly(e.target.checked);
                setPage(1);
              }}
            />
            Samo moji
          </label>

          <SelectInput
            label="Tip"
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
            }}
            options={TYPE_OPTIONS}
            style={{ minWidth: 160 }}
          />

          <TextInput
            label="Pretraga"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="ime ili opis…"
          />

          <SelectInput
            label="Sortiraj po"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={SORT_BY_OPTIONS}
            style={{ minWidth: 160 }}
          />

          <Button
            variant="outline"
            onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
            title="Promeni smer"
          >
            {sortDir === "asc" ? "↑" : "↓"}
          </Button>

          <SelectInput
            label="Po strani"
            value={String(pageSize)}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            options={PAGE_SIZE_OPTIONS}
            style={{ minWidth: 110 }}
          />

          <Button
            variant="outline"
            onClick={() => {
              setTypeFilter("");
              setQuery("");
              setShowMineOnly(false);
              setSortBy("name");
              setSortDir("asc");
              setPage(1);
            }}
            title="Reset"
          >
            Reset
          </Button>
        </div>
      </div>

      {loading && <p>Učitavam…</p>}
      {err && <p style={{ color: "#ff6b6b" }}>{err}</p>}

      {!loading && !err && (
        <Card>
          {!items.length ? (
            <p style={{ margin: 0, opacity: 0.85 }}>Nema vežbi za prikaz.</p>
          ) : (
            <>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: 8 }}>ID</th>
                      <th style={{ textAlign: "left", padding: 8 }}>Naziv</th>
                      <th style={{ textAlign: "left", padding: 8 }}>Opis</th>
                      <th style={{ textAlign: "left", padding: 8 }}>Ponavljanja/Vreme</th>
                      <th style={{ textAlign: "left", padding: 8 }}>Tip</th>
                      <th style={{ textAlign: "left", padding: 8 }}>Workout</th>

                      {(role === "member" || role === "admin") && (
                        <th style={{ textAlign: "left", padding: 8 }}>Akcije</th>
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((ex) => (
                      <tr key={ex.id} style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}>
                        <td style={{ padding: 8 }}>{ex.id}</td>
                        <td style={{ padding: 8 }}>{ex.name ?? "-"}</td>
                        <td style={{
                          padding: 8,
                          maxWidth: 360,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>
                          {ex.description ?? "-"}
                        </td>
                        <td style={{ padding: 8 }}>{ex.reps_or_time ?? "-"}</td>
                        <td style={{ padding: 8 }}>{ex.type ?? "-"}</td>
                        <td style={{ padding: 8 }}>{pickWorkoutName(ex)}</td>

                        {(role === "member" || role === "admin") && (
                          <td style={{ padding: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                            <Link className="btn btn-outline" to={`/exercises/${ex.id}/edit`}>
                              Uredi
                            </Link>

                            <Button
                              variant="ghost"
                              disabled={busyId === ex.id}
                              onClick={() => setConfirmId(ex.id)}
                            >
                              {busyId === ex.id ? "Brišem…" : "Obriši"}
                            </Button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* PAGINACIJA – backend-driven */}
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Prethodna
                </Button>

                <span style={{ opacity: 0.8 }}>
                  Strana {page} / {totalPages}
                </span>

                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Sledeća
                </Button>
              </div>
            </>
          )}
        </Card>
      )}

      {/* DELETE modal */}
      <Modal
        open={!!confirmId}
        title="Potvrda brisanja vežbe"
        onClose={() => setConfirmId(null)}
      >
        <p>Da li sigurno želiš da obrišeš ovu vežbu?</p>

        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
          marginTop: 12
        }}>
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
