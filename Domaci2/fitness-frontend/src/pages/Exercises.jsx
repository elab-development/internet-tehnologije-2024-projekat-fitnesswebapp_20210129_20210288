// Lista vežbi sa filtriranjem, sortiranjem i paginacijom (sve na front-endu).

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

  const [typeFilter, setTypeFilter] = useState("");
  const [query, setQuery] = useState("");
  const [showMineOnly, setShowMineOnly] = useState(false);

  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [confirmId, setConfirmId] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    try {
      setErr("");
      setLoading(true);
      const list = await fetchExercises({});
      setItems(Array.isArray(list) ? list : (list?.data ?? []));
      setPage(1);
    } catch {
      setErr("Ne mogu da učitam vežbe.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Filtriranje (uključuje "Samo moji" sa fallback-ovima)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return items.filter((ex) => {
      const ownerId =
        ex?.workout?.user_id ?? ex?.workout_user_id ?? ex?.user_id ?? null;

      if (showMineOnly && ownerId !== user?.id) return false;

      const okType = !typeFilter || String(ex.type).toLowerCase() === typeFilter;
      const okQuery =
        !q ||
        String(ex.name ?? "").toLowerCase().includes(q) ||
        String(ex.description ?? "").toLowerCase().includes(q);

      return okType && okQuery;
    });
  }, [items, typeFilter, query, showMineOnly, user?.id]);

  // Sortiranje
  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const av = a?.[sortBy];
      const bv = b?.[sortBy];

      const isNum = sortBy === "id" || sortBy === "reps_or_time";
      let cmp;
      if (isNum) {
        const na = Number(av ?? 0);
        const nb = Number(bv ?? 0);
        cmp = na === nb ? 0 : na < nb ? -1 : 1;
      } else {
        const sa = String(av ?? "").toLowerCase();
        const sb = String(bv ?? "").toLowerCase();
        cmp = sa === sb ? 0 : sa < sb ? -1 : 1;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortBy, sortDir]);

  // Paginacija
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;
  const paged = sorted.slice(start, end);

  const doDelete = async () => {
    if (!confirmId) return;
    try {
      setBusyId(confirmId);
      await deleteExercise(confirmId);
      setItems((prev) => prev.filter((x) => String(x.id) !== String(confirmId)));
      setConfirmId(null);
    } catch {
      alert("Brisanje nije uspelo.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="container section">
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
        <h2 style={{ margin: 0 }}>Exercises</h2>

        {(role === "member" || role === "admin") && (
          <Link to="/exercises/new" className="btn">+ Nova vežba</Link>
        )}

        <Button variant="outline" onClick={load}>Osveži</Button>

        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginLeft: "auto" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="checkbox"
              checked={showMineOnly}
              onChange={(e) => { setShowMineOnly(e.target.checked); setPage(1); }}
            />
            Samo moji
          </label>

          <SelectInput
            label="Tip"
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
            options={TYPE_OPTIONS}
            style={{ minWidth: 160 }}
          />

          <TextInput
            label="Pretraga"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
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
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
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
          {!paged.length ? (
            <p style={{ margin: 0, opacity: .85 }}>Nema vežbi za prikaz.</p>
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
                    {paged.map((ex) => (
                      <tr key={ex.id} style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}>
                        <td style={{ padding: 8 }}>{ex.id}</td>
                        <td style={{ padding: 8 }}>{ex.name ?? "-"}</td>
                        <td style={{ padding: 8, maxWidth: 360, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {ex.description ?? "-"}
                        </td>
                        <td style={{ padding: 8 }}>{ex.reps_or_time ?? "-"}</td>
                        <td style={{ padding: 8 }}>{ex.type ?? "-"}</td>
                        <td style={{ padding: 8 }}>{pickWorkoutName(ex)}</td>

                        {(role === "member" || role === "admin") && (
                          <td style={{ padding: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                            <Link className="btn btn-outline" to={`/exercises/${ex.id}/edit`}>Uredi</Link>
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

              <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", alignItems: "center", marginTop: 10 }}>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                >
                  Prethodna
                </Button>
                <span style={{ opacity: 0.8 }}>
                  Strana {safePage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                >
                  Sledeća
                </Button>
              </div>
            </>
          )}
        </Card>
      )}

      <Modal
        open={!!confirmId}
        title="Potvrda brisanja vežbe"
        onClose={() => setConfirmId(null)}
      >
        <p>Da li sigurno želiš da obrišeš ovu vežbu?</p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
          <button className="btn btn-outline" onClick={() => setConfirmId(null)}>Ne</button>
          <button className="btn" onClick={doDelete}>Da, obriši</button>
        </div>
      </Modal>
    </div>
  );
}
