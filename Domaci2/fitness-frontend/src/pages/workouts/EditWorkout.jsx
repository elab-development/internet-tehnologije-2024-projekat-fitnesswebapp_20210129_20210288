/**
 * EditWorkout - Izmena treninga
 * Omogućava izmenu postojećeg treninga (member/admin)
 * Koristi GET /workouts/:id i PUT /users/workouts/:id
 */

import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import SelectInput from "../../components/ui/SelectInput";
import { fetchWorkout, updateWorkout } from "../../api/workouts";
import { parseNonNegativeNumber } from "../../utils/dataHelpers";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "started", label: "Started" },
  { value: "completed", label: "Completed" },
];

export default function EditWorkout() {
  const nav = useNavigate();
  const { id } = useParams();

  // forma
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [status, setStatus] = useState("pending");

  // ui
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  // učitavanje
  const load = useCallback(async () => {
    setErr("");
    setLoading(true);
    try {
      const data = await fetchWorkout(id); // GET /workouts/:id
      setName(data?.name || "");
      setDesc(data?.description || "");
      setDuration(data?.duration == null ? "" : String(data.duration));
      setCalories(data?.calories_burned == null ? "" : String(data.calories_burned));
      setStatus(data?.status || "pending");
    } catch (e) {
      console.error(e);
      setErr("Ne mogu da učitam ovaj trening.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  // validacija
  const { durationParsed, caloriesParsed, formError } = useMemo(() => {
    if (!name.trim()) return { durationParsed: null, caloriesParsed: null, formError: "Naziv je obavezan." };
    const d = parseNonNegativeNumber(duration);
    if (Number.isNaN(d)) return { durationParsed: d, caloriesParsed: null, formError: "Trajanje mora biti nenegativan broj." };
    const c = parseNonNegativeNumber(calories);
    if (Number.isNaN(c)) return { durationParsed: d, caloriesParsed: c, formError: "Kalorije moraju biti nenegativan broj." };
    return { durationParsed: d, caloriesParsed: c, formError: "" };
  }, [name, duration, calories]);

  // Submit handler
  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (formError) return setErr(formError);

    const payload = {
      name: name.trim(),
      description: description.trim(),
      duration: durationParsed,
      calories_burned: caloriesParsed,
      status, // "pending" | "started" | "completed"
    };

    try {
      setSaving(true);
      await updateWorkout(id, payload);
      nav("/workouts");
    } catch (e) {
      console.error(e);
      setErr("Ažuriranje nije uspelo. Pokušaj ponovo.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container section">
        <h2 style={{ marginTop: 0 }}>Izmena treninga</h2>
        <p>Učitavam…</p>
      </div>
    );
  }

  return (
    <div className="container section" style={{ maxWidth: 720 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <h2 style={{ marginTop: 0, marginBottom: 14 }}>Izmeni trening</h2>
        <Link className="btn btn-outline" to="/workouts">Nazad</Link>
      </div>

      <Card>
        <form onSubmit={submit} noValidate>
          <div className="field">
            <label>Naziv *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="npr. Upper body"
              required
            />
          </div>

          <div className="field">
            <label>Opis</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Kratak opis..."
            />
          </div>

          <div className="form-grid">
            <div className="field">
              <label>Trajanje (min)</label>
              <input
                type="number"
                min="0"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="45"
              />
            </div>

            <div className="field">
              <label>Kalorije (kcal)</label>
              <input
                type="number"
                min="0"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="300"
              />
            </div>
          </div>

          <SelectInput
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={STATUS_OPTIONS}
          />

          {err && <p style={{ color: "#ff6b6b", marginTop: 8 }}>{err}</p>}

          <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
            <Button type="submit" disabled={saving || !!formError}>
              {saving ? "Čuvam..." : "Sačuvaj izmene"}
            </Button>
            <Button type="button" variant="outline" onClick={() => nav(-1)}>
              Otkaži
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
