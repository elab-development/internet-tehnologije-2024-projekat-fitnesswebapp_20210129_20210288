// src/pages/AdminGoals.jsx
//
// Admin: pregled i osnovno upravljanje ciljevima (goals)

import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

// UI komponente
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

// API
import { fetchGoals, deleteGoal } from "../api/goals";

// Pomoćne funkcije za izvlačenje podataka iz ciljeva

function pickTitle(goal) {
  return goal?.title ?? goal?.name ?? goal?.goal ?? "(bez naziva)";
}

/**
 * Vraća opis cilja ili "/" ako nije zadat.
 */
function pickDescription(goal) {
  return goal?.description ?? "/";
}

/**
 * Vraća rok (datum) cilja. Ako ga nema, vraća null.
 */
function pickDate(goal) {
  return goal?.target_date ?? goal?.due_date ?? goal?.deadline ?? goal?.targetDate ?? null;
}

/**
 * Vraća ime korisnika (ili ID) kome cilj pripada.
 */
function pickUser(goal) {
  return goal?.user?.name ?? goal?.user_name ?? goal?.userId ?? goal?.user_id ?? "-";
}

/**
 * Vraća status cilja.
 */
function pickStatus(goal) {
  return goal?.status ?? "-";
}

// Tabela ciljeva

/**
 * Red u tabeli sa jednim ciljem i akcijama.
 */
function GoalsRow({ goal, onAskDelete, busyId }) {
  const id = goal?.id;
  const isBusy = String(busyId) === String(id);

  return (
    <tr style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}>
      <td style={{ padding: 8 }}>{id}</td>
      <td style={{ padding: 8 }}>{pickTitle(goal)}</td>
      <td
        style={{
          padding: 8,
          maxWidth: 300,
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
        title={pickDescription(goal)}
      >
        {pickDescription(goal)}
      </td>
      <td style={{ padding: 8 }}>{pickUser(goal)}</td>
      <td style={{ padding: 8 }}>{pickDate(goal) ?? "-"}</td>
      {/* NOVO: status kolona */}
      <td style={{ padding: 8 }}>{pickStatus(goal)}</td>

      <td style={{ padding: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Link className="btn btn-outline" to={`/goals/${id}/edit`} state={{ goal }}>
          Uredi
        </Link>

        <Button
          variant="ghost"
          disabled={isBusy}
          onClick={() => onAskDelete(id)}
        >
          {isBusy ? "Brišem…" : "Obriši"}
        </Button>
      </td>
    </tr>
  );
}

/**
 * Tabela ciljeva.
 */
function GoalsTable({ goals, onAskDelete, busyId }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: 8 }}>ID</th>
            <th style={{ textAlign: "left", padding: 8 }}>Naziv</th>
            <th style={{ textAlign: "left", padding: 8 }}>Opis</th>
            <th style={{ textAlign: "left", padding: 8 }}>Korisnik</th>
            <th style={{ textAlign: "left", padding: 8 }}>Rok</th>
            <th style={{ textAlign: "left", padding: 8 }}>Status</th>
            <th style={{ textAlign: "left", padding: 8 }}>Akcije</th>
          </tr>
        </thead>

        <tbody>
          {goals.map((g) => (
            <GoalsRow
              key={g.id}
              goal={g}
              busyId={busyId}
              onAskDelete={onAskDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Glavna komponenta stranice

export default function AdminGoals() {
  // --- Podaci iz API-ja (lista ciljeva) ---
  const [goals, setGoals] = useState([]);

  // --- UI stanja ---
  const [isLoading, setIsLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  // Modal za potvrdu brisanja
  const [confirmId, setConfirmId] = useState(null);

  // ID reda koji se briše
  const [busyId, setBusyId] = useState(null);

  // Učitavanje ciljeva iz API-ja
  const loadGoals = useCallback(async () => {
    try {
      setErrorText("");
      setIsLoading(true);

      const list = await fetchGoals();
      const safeArray = Array.isArray(list) ? list : [];

      setGoals(safeArray);
    } catch {
      setErrorText("Ne mogu da učitam ciljeve. Proveri backend ili privilegije.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Prvo učitavanje
  useEffect(() => {
    loadGoals();
  }, [loadGoals]);

  /**
   * Potvrđeno brisanje cilja.
   */
  const handleConfirmDelete = async () => {
    // nema šta da briše
    if (!confirmId) return;

    try {
      setBusyId(confirmId);

      // Pozovi backend
      await deleteGoal(confirmId);

      // Ukloni obrisani element iz lokalne liste
      setGoals((prev) => prev.filter((g) => String(g.id) !== String(confirmId)));

      // Zatvori modal
      setConfirmId(null);
    } catch {
      alert("Brisanje cilja nije uspelo.");
    } finally {
      setBusyId(null);
    }
  };

  // Renderovanje stranice

  // LOADING
  if (isLoading) {
    return (
      <div className="container section">
        <h2 style={{ marginTop: 0 }}>Admin · Goals</h2>
        <p>Učitavam ciljeve…</p>
      </div>
    );
  }

  // ERROR
  if (errorText) {
    return (
      <div className="container section">
        <h2 style={{ marginTop: 0 }}>Admin · Goals</h2>
        <p style={{ color: "#ff6b6b" }}>{errorText}</p>
        <Button onClick={loadGoals}>Pokušaj ponovo</Button>
      </div>
    );
  }

  // SUCCESS (može biti empty ili sa podacima)
  const isEmpty = goals.length === 0;

  return (
    <div className="container section">
      {/* Header i akcije (Novi, Osveži) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h2 style={{ margin: 0 }}>Admin · Goals</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <Link to="/goals/new" className="btn">
            + Novi cilj
          </Link>
          <Button variant="outline" onClick={loadGoals}>
            Osveži
          </Button>
        </div>
      </div>

      {/* Kartica sa sadržajem */}
      <Card>
        {isEmpty ? (
          // PRAZNO STANJE
          <p style={{ margin: 0, opacity: 0.85 }}>
            Trenutno nema ciljeva.
          </p>
        ) : (
          // TABELA SA CILJEVIMA
          <GoalsTable goals={goals} busyId={busyId} onAskDelete={setConfirmId} />
        )}
      </Card>

      {/* Modal: Potvrda brisanja - REUSABLE KOMPONENTA*/}
      <Modal
        open={!!confirmId}
        title="Potvrda brisanja cilja"
        onClose={() => setConfirmId(null)}
      >
        <p>Da li sigurno želiš da obrišeš ovaj cilj?</p>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
          <button
            className="btn btn-outline"
            onClick={() => setConfirmId(null)}
          >
            Ne
          </button>

          <button className="btn" onClick={handleConfirmDelete}>
            Da, obriši
          </button>
        </div>
      </Modal>
    </div>
  );
}
