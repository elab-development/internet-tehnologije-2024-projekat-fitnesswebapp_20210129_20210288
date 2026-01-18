/**
 * AdminGoalForm - Forma za ciljeve
 * Omogućava kreiranje novog ili izmenu postojećeg cilja
 * Admin funkcionalnost za upravljanje ciljevima korisnika
 */

import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SetTitle from "../../components/SetTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import TextInput from "../../components/ui/TextInput";
import SelectInput from "../../components/ui/SelectInput";
import { createGoal, fetchGoal, updateGoal } from "../../api/goals";
import { fetchUsers } from "../../api/admin";
import { getGoalTitle, getGoalTargetDate } from "../../utils/dataHelpers";

// Statusi ciljeva
const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

export default function AdminGoalForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const nav = useNavigate();
  const location = useLocation();
  const initialGoal = location.state?.goal || null;

  // forma
  const [title, setTitle] = useState(getGoalTitle(initialGoal) || "");
  const [description, setDescription] = useState(initialGoal?.description ?? "");
  const [targetDate, setTargetDate] = useState(getGoalTargetDate(initialGoal) || ""); // očekujemo "YYYY-MM-DD"
  const [userId, setUserId] = useState(initialGoal?.user_id ?? initialGoal?.userId ?? "");
  const [status, setStatus] = useState(initialGoal?.status ?? "pending");

  // users za dropdown
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // ui
  const [loading, setLoading] = useState(isEdit && !initialGoal);
  const [err, setErr] = useState("");

  // učitaj korisnike
  useEffect(() => {
    (async () => {
      try {
        setLoadingUsers(true);
        const list = await fetchUsers();
        setUsers(Array.isArray(list) ? list : []);
      } catch {
        // ne koči formu ako nema liste
      } finally {
        setLoadingUsers(false);
      }
    })();
  }, []);

  // ako je edit i nemamo state, fetch detalja
  useEffect(() => {
    if (!isEdit || initialGoal) return;
    let active = true;
    (async () => {
      try {
        setErr("");
        setLoading(true);
        const g = await fetchGoal(id);
        if (!active) return;
        setTitle(getGoalTitle(g) || "");
        setDescription(g?.description ?? "");
        setTargetDate(getGoalTargetDate(g) || "");
        setUserId(g?.user_id ?? g?.userId ?? "");
        setStatus(g?.status ?? "pending");
      } catch {
        if (active) setErr("Ne mogu da učitam cilj.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [id, isEdit, initialGoal]);

  // jednostavna validacija
  const formError = useMemo(() => {
    if (!title.trim()) return "Naziv je obavezan.";
    if (!String(userId).trim()) return "Morate odabrati korisnika.";
    return "";
  }, [title, userId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (formError) return setErr(formError);

    // Normalizuj vrednost datuma – prosledi string kakav dobijamo iz <input type="date">
    const dateStr = targetDate && String(targetDate).trim() ? String(targetDate).trim() : null;

    // Šaljemo na backend u snake_case i camelCase formatu
    const payload = {
      title: title.trim(),
      description: description.trim(),
      user_id: Number(userId),
      status,

      // snake_case
      target_date: dateStr,
      due_date: dateStr,
      deadline: dateStr,
      deadline_at: dateStr,

      // camelCase (za svaki slučaj)
      targetDate: dateStr,
      dueDate: dateStr,
    };

    // Pošalji zahtev
    try {
      setLoading(true);
      if (isEdit) await updateGoal(id, payload);
      else await createGoal(payload);
      nav("/goals");
    } catch {
      setErr("Čuvanje nije uspelo. Proveri polja i privilegije.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section" style={{ maxWidth: 720 }}>
      <SetTitle title={isEdit ? "Edit Goal" : "New Goal"} />
      <h2 style={{ marginTop: 0, marginBottom: 14 }}>
        {isEdit ? "Uredi cilj" : "Novi cilj"}
      </h2>

      {loading && <p>Učitavam…</p>}
      {!loading && (
        <Card>
          <form onSubmit={onSubmit} noValidate>
            <TextInput
              label="Naziv *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="npr. 5km trčanje"
              error={formError && !title.trim() ? "Naziv je obavezan." : ""}
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
                label="Rok (YYYY-MM-DD)"
                type="date"
                value={targetDate || ""}
                onChange={(e) => setTargetDate(e.target.value)}
              />

              <SelectInput
                label="Korisnik *"
                value={String(userId)}
                onChange={(e) => setUserId(e.target.value)}
                disabled={loadingUsers}
                options={[
                  { value: "", label: "— odaberi korisnika —" },
                  ...users.map((u) => ({
                    value: u.id,
                    label: u.name ?? u.email ?? `#${u.id}`,
                  })),
                ]}
              />
            </div>

            <SelectInput
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={STATUS_OPTIONS}
              style={{ marginTop: 10 }}
            />

            {err && <p style={{ color: "#ff6b6b", marginTop: 8 }}>{err}</p>}

            <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
              <Button type="submit" disabled={!!formError || loading}>
                {isEdit ? (loading ? "Čuvam…" : "Sačuvaj izmene") : (loading ? "Kreiram…" : "Kreiraj")}
              </Button>
              <Button type="button" variant="outline" onClick={() => nav("/goals")}>
                Otkaži
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}
