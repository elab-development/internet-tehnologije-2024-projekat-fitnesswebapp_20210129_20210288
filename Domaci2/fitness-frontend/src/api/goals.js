// src/api/goals.js
// Admin-only CRUD za ciljeve (goals).
// Backend: Route::apiResource('goals', GoalController::class)

import { api } from "./client";

// Normalizacija payload-a cilja (goal) pre slanja na backend
function normalizeGoalPayload(payload = {}) {
  // pokupi datum ako je već pod nekim ključem
  const raw =
    payload.target_date ??
    payload.due_date ??
    payload.deadline ??
    payload.targetDate ??
    payload.dueDate ??
    null;

  // formatiraj na YYYY-MM-DD za svaki slučaj
  let yyyyMmDd = raw ? String(raw).slice(0, 10) : null;

  return {
    ...payload,
    target_date: yyyyMmDd,
    due_date: yyyyMmDd,
    deadline: yyyyMmDd,
  };
}

// Lista svih ciljeva
export async function fetchGoals() {
  const { data } = await api.get("/goals");
  return Array.isArray(data) ? data : (data.data || []);
}

// Jedan cilj po ID
export async function fetchGoal(id) {
  const { data } = await api.get(`/goals/${id}`);
  return data.data || data;
}

// Kreiranje novog cilja
export async function createGoal(payload) {
  const body = normalizeGoalPayload(payload);
  const { data } = await api.post("/goals", body);
  return data.data || data;
}

// Izmena postojećeg cilja
export async function updateGoal(id, payload) {
  const body = normalizeGoalPayload(payload);
  const { data } = await api.put(`/goals/${id}`, body);
  return data.data || data;
}

// Brisanje cilja
export async function deleteGoal(id) {
  const { data } = await api.delete(`/goals/${id}`);
  return data;
}
