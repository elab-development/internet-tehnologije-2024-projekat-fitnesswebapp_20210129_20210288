// src/pages/CreateWorkout.jsx
//
// Stranica za KREIRANJE treninga (member/admin).
// - POST /users/workouts
// - Jednostavna validacija (naziv obavezan, brojevi >= 0)
// - Nakon uspeha: redirect na /workouts

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import SelectInput from "../components/ui/SelectInput";
import { createWorkout } from "../api/workouts";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "started", label: "Started" },
  { value: "completed", label: "Completed" },
];

/** Nenegativan broj ili null */
function toNonNegativeNumberOrNull(v) {
  if (v === "" || v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : NaN;
}

export default function CreateWorkout() {
  const nav = useNavigate();

  // forma
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [status, setStatus] = useState("pending");

  // ui
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // validacija
  const { durationParsed, caloriesParsed, formError } = useMemo(() => {
    const d = toNonNegativeNumberOrNull(duration);
    const c = toNonNegativeNumberOrNull(calories);

    if (!name.trim()) {
      return { durationParsed: d, caloriesParsed: c, formError: "Naziv je obavezan." };
    }
    if (Number.isNaN(d)) {
      return { durationParsed: d, caloriesParsed: c, formError: "Trajanje mora biti nenegativan broj." };
    }
    if (Number.isNaN(c)) {
      return { durationParsed: d, caloriesParsed: c, formError: "Kalorije moraju biti nenegativan broj." };
    }
    return { durationParsed: d, caloriesParsed: c, formError: "" };
  }, [name, duration, calories]);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (formError) return setErr(formError);

    const payload = {
      name: name.trim(),
      description: description.trim(),
      duration: durationParsed,        // null ili broj
      calories_burned: caloriesParsed, // null ili broj
      status,                          // "pending" | "started" | "completed"
    };

    try {
      setLoading(true);
      await createWorkout(payload);
      nav("/workouts");
    } catch {
      setErr("Kreiranje nije uspelo. Proveri privilegije i backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section" style={{ maxWidth: 720 }}>
      <h2 style={{ marginTop: 0, marginBottom: 14 }}>Novi trening</h2>

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
            <Button type="submit" disabled={loading || !!formError}>
              {loading ? "Čuvam..." : "Sačuvaj"}
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
