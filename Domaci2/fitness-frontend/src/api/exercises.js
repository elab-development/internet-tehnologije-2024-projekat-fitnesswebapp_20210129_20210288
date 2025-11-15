// API pozivi za exercises CRUD
import { api } from "./client";

// Vrati listu vežbi sa paginacijom i filtriranjem sa backenda
export async function fetchExercises(params = {}) {
  const { data } = await api.get("/exercises", { params });
  return data;
}

// Vrati jednu vežbu po ID
export async function fetchExercise(id) {
  const { data } = await api.get(`/exercises/${id}`);
  return data?.data || data;
}

// Kreiraj novu vežbu
export async function createExercise(payload) {
  // { name, description, reps_or_time, type, workout_id }
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
