// src/pages/EditWorkout.jsx
//
// Stranica za IZMENU postojećeg treninga (member/admin).
// - Učitava podatke GET /workouts/:id (public detalj)
// - Submituje izmene PUT /users/workouts/{id}
// - Validacija polja kao kod kreiranja
// - Nakon uspesne izmene preusmeri na /workouts

import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { fetchWorkout, updateWorkout } from "../api/workouts";

/* "" -> null, broj >= 0 -> number, ostalo -> NaN */
function toNonNegativeNumberOrNull(v) {
    if (v === "" || v == null) return null;
    const n = Number(v);
    return Number.isFinite(n) && n >= 0 ? n : NaN;
}

export default function EditWorkout() {
    const nav = useNavigate();
    const { id } = useParams();

    // --- Podaci forme ---
    const [name, setName] = useState("");
    const [description, setDesc] = useState("");
    const [duration, setDuration] = useState("");
    const [calories, setCalories] = useState("");

    // --- UI state ---
    const [loading, setLoading] = useState(true); // loading inicijalnog fetch-a
    const [saving, setSaving] = useState(false); // loading na submit
    const [err, setErr] = useState("");            // poruka o grešci (fetch ili submit)

    // Učitavanje postojećeg treninga
    const load = useCallback(async () => {
        setErr("");
        setLoading(true);
        try {
            const data = await fetchWorkout(id); // GET /workouts/:id (public detalj)
            // oblik -> id, name, description, duration, calories_burned, ... 
            setName(data?.name || "");
            setDesc(data?.description || "");
            setDuration(
                data?.duration == null ? "" : String(data.duration)
            );
            setCalories(
                data?.calories_burned == null ? "" : String(data.calories_burned)
            );
        } catch (e) {
            console.error(e);
            setErr("Ne mogu da učitam ovaj trening. Proveri da li postoji backend i ID.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => { load(); }, [load]);

    // Validacija polja
    const { durationParsed, caloriesParsed, formError } = useMemo(() => {
        if (!name.trim()) return { durationParsed: null, caloriesParsed: null, formError: "Naziv je obavezan." };
        const d = toNonNegativeNumberOrNull(duration);
        if (Number.isNaN(d)) return { durationParsed: d, caloriesParsed: null, formError: "Trajanje mora biti nenegativan broj." };
        const c = toNonNegativeNumberOrNull(calories);
        if (Number.isNaN(c)) return { durationParsed: d, caloriesParsed: c, formError: "Kalorije moraju biti nenegativan broj." };
        return { durationParsed: d, caloriesParsed: c, formError: "" };
    }, [name, duration, calories]);

    // Submit PUT
    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        if (formError) return setErr(formError);

        const payload = {
            name: name.trim(),
            description: description.trim(),
            duration: durationParsed,
            calories_burned: caloriesParsed,
        };

        try {
            setSaving(true);
            await updateWorkout(id, payload);   // PUT /users/workouts/:id
            nav("/workouts");                   // nazad na panel
        } catch (e) {
            console.error(e);
            setErr("Ažuriranje nije uspelo. Pokušaj ponovo.");
        } finally {
            setSaving(false);
        }
    };

    // --- Prikaz ---
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
                <Link className="btn btn-outline" to="/workouts">← Nazad</Link>
            </div>

            <Card>
                <form onSubmit={submit} noValidate>
                    {/* Naziv (obavezno) */}
                    <div className="field">
                        <label>Naziv *</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="npr. Upper body"
                            required
                        />
                    </div>

                    {/* Opis (opciono) */}
                    <div className="field">
                        <label>Opis</label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Kratak opis..."
                        />
                    </div>

                    {/* Numerička polja – opciono, nenegativni brojevi */}
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

                    {/* Greška (ako postoji) */}
                    {err && <p style={{ color: "#ff6b6b", marginTop: 8 }}>{err}</p>}

                    {/* Akcije */}
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
