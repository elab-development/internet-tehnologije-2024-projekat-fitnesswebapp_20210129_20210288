// Forma za kreiranje/izmenu vežbe sa dropdown-om za "type".
// - POST /exercises
// - GET /exercises/:id
// - PUT /exercises/:id

import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import TextInput from "../components/ui/TextInput";
import SelectInput from "../components/ui/SelectInput";
import { createExercise, fetchExercise, updateExercise } from "../api/exercises";
import { fetchMyWorkouts } from "../api/workouts";

const TYPE_OPTIONS = [
  { value: "cardio", label: "cardio" },
  { value: "strength", label: "strength" },
  { value: "flexibility", label: "flexibility" },
];

export default function ExerciseForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const nav = useNavigate();
  const location = useLocation();

  const initial = location.state?.exercise || null;

  // forma
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [repsOrTime, setRepsOrTime] = useState(initial?.reps_or_time ?? "");
  const [type, setType] = useState(initial?.type ?? "cardio");
  const [workoutId, setWorkoutId] = useState(initial?.workout_id ?? "");

  // pomoćni podaci
  const [workouts, setWorkouts] = useState([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(true);

  // ui
  const [loading, setLoading] = useState(isEdit && !initial);
  const [err, setErr] = useState("");

  // učitaj listu sopstvenih workouta (za dropdown)
  useEffect(() => {
    (async () => {
      try {
        setLoadingWorkouts(true);
        const list = await fetchMyWorkouts();
        const arr = Array.isArray(list) ? list : (list?.data ?? []);
        setWorkouts(arr);
      } catch {
        setWorkouts([]); 
      } finally {
        setLoadingWorkouts(false);
      }
    })();
  }, []);

  // učitaj vežbu ako je edit i nemamo inicijalnu
  useEffect(() => {
    if (!isEdit || initial) return;
    let active = true;
    (async () => {
      try {
        setErr("");
        setLoading(true);
        const ex = await fetchExercise(id);
        const data = ex?.data ?? ex ?? null;
        if (!active || !data) return;
        setName(data.name ?? "");
        setDescription(data.description ?? "");
        setRepsOrTime(data.reps_or_time ?? "");
        setType(data.type ?? "cardio");
        setWorkoutId(data.workout_id ?? "");
      } catch {
        if (active) setErr("Ne mogu da učitam vežbu.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [id, isEdit, initial]);

  // prosta validacija
  const formError = useMemo(() => {
    if (!name.trim()) return "Naziv je obavezan.";
    if (!repsOrTime || Number.isNaN(Number(repsOrTime))) return "Ponavljanja/Vreme mora biti broj.";
    if (!workoutId) return "Morate odabrati workout.";
    return "";
  }, [name, repsOrTime, workoutId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (formError) return setErr(formError);

    const payload = {
      name: name.trim(),
      description: description.trim() || null,
      reps_or_time: Number(repsOrTime),
      type, 
      workout_id: Number(workoutId),
    };

    try {
      setLoading(true);
      if (isEdit) await updateExercise(id, payload);
      else await createExercise(payload);
      nav("/exercises");
    } catch {
      setErr("Čuvanje nije uspelo. Proveri polja i privilegije.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section" style={{ maxWidth: 720 }}>
      <h2 style={{ marginTop: 0, marginBottom: 14 }}>
        {isEdit ? "Uredi vežbu" : "Nova vežba"}
      </h2>

      {loading && <p>Učitavam…</p>}
      {!loading && (
        <Card>
          <form onSubmit={onSubmit} noValidate>
            <TextInput
              label="Naziv *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="npr. Bench press"
              error={formError && !name.trim() ? "Naziv je obavezan." : ""}
            />

            <label className="field">
              <span>Opis</span>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Kratak opis…"
              />
            </label>

            <div className="form-grid">
              <TextInput
                label="Ponavljanja/Vreme *"
                type="number"
                value={String(repsOrTime)}
                onChange={(e) => setRepsOrTime(e.target.value)}
              />

              <SelectInput
                label="Tip *"
                value={type}
                onChange={(e) => setType(e.target.value)}
                options={TYPE_OPTIONS}
              />
            </div>

            <div className="field">
              <label>Workout *</label>
              {/* Ručni unos za svaki slučaj */}
              <select
                value={String(workoutId)}
                onChange={(e) => setWorkoutId(e.target.value)}
                disabled={loadingWorkouts}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "var(--fg)",
                  padding: "10px 12px",
                  borderRadius: 10,
                  outline: "none",
                }}
              >
                <option value="">— odaberi workout —</option>
                {workouts.map((w) => (
                  <option key={w.id} value={w.id} style={{ color: "#111" }}>
                    {w.name ?? `#${w.id}`}
                  </option>
                ))}
              </select>
              <small style={{ opacity: .7 }}>Ako lista nije učitana, unesite ID ispod.</small>
              <input
                type="number"
                min="1"
                placeholder="workout_id (ručni unos)"
                value={String(workoutId)}
                onChange={(e) => setWorkoutId(e.target.value)}
                style={{ marginTop: 8 }}
              />
            </div>

            {err && <p style={{ color: "#ff6b6b", marginTop: 8 }}>{err}</p>}

            <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
              <Button type="submit" disabled={!!formError || loading}>
                {isEdit ? (loading ? "Čuvam…" : "Sačuvaj izmene") : (loading ? "Kreiram…" : "Kreiraj")}
              </Button>
              <Button type="button" variant="outline" onClick={() => nav("/exercises")}>
                Otkaži
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}
