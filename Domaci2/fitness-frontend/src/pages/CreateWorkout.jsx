// src/pages/CreateWorkout.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { createWorkout } from "../api/workouts";

export default function CreateWorkout() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    const payload = {
      name: name.trim(),
      description: description.trim(),
      duration: duration !== "" ? Number(duration) : null,
      calories_burned: calories !== "" ? Number(calories) : null,
    };

    if (!payload.name) return setErr("Naziv je obavezan.");

    // jednostavna validacija brojeva
    if (payload.duration != null && payload.duration < 0) {
      return setErr("Trajanje ne može biti negativno.");
    }
    if (payload.calories_burned != null && payload.calories_burned < 0) {
      return setErr("Kalorije ne mogu biti negativne.");
    }

    try {
      setLoading(true);
      await createWorkout(payload);          // POST /users/workouts (backend)
      nav("/workouts");                      // nazad na panel sa mojim treninzima
    } catch (e) {
      setErr("Kreiranje nije uspelo. Proveri da li si uneo sve podatke i da li imaš potreben privilegije.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section" style={{ maxWidth: 720 }}>
      <h2 style={{ marginTop: 0, marginBottom: 14 }}>Novi trening</h2>
      <Card>
        <form onSubmit={submit}>
          <div className="field">
            <label>Naziv *</label>
            <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="npr. Upper body"
              required
            />
          </div>

          <div className="field">
            <label>Opis</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e)=>setDesc(e.target.value)}
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
                onChange={(e)=>setDuration(e.target.value)}
                placeholder="45"
              />
            </div>
            <div className="field">
              <label>Kalorije (kcal)</label>
              <input
                type="number"
                min="0"
                value={calories}
                onChange={(e)=>setCalories(e.target.value)}
                placeholder="300"
              />
            </div>
          </div>

          {err && <p style={{ color:"#ff6b6b", marginTop: 8 }}>{err}</p>}

          <div style={{ marginTop: 12, display:"flex", gap:10 }}>
            <Button type="submit" disabled={loading}>
              {loading ? "Čuvam..." : "Sačuvaj"}
            </Button>
            <Button type="button" variant="outline" onClick={()=>nav(-1)}>
              Otkaži
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
