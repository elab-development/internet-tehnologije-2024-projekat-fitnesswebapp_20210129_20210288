// API pozivi za exercises CRUD
import { api } from "./client";

// Vrati listu svih vežbi
export async function fetchExercises() {
  const { data } = await api.get("/exercises");
  return Array.isArray(data) ? data : (data?.data || []);
}

// Vrati jednu vežbu po ID
export async function fetchExercise(id) {
  const { data } = await api.get(`/exercises/${id}`);
  return data?.data || data;
}

// Kreiraj novu vežbu
export async function createExercise(payload) {
  // payload: { name, description?, reps_or_time, type, workout_id }
  const { data } = await api.post("/exercises", payload);
  return data?.exercise || data?.data || data;
}

// Izmeni postojeću vežbu
export async function updateExercise(id, payload) {
  const { data } = await api.put(`/exercises/${id}`, payload);
  return data?.exercise || data?.data || data;
}

// Obriši vežbu
export async function deleteExercise(id) {
  const { data } = await api.delete(`/exercises/${id}`);
  return data;
}
