// src/api/workouts.js
import { api } from "./client";

// Lista svih (public za guest/member/admin)
export async function fetchWorkouts() {
  const { data } = await api.get("/workouts");
  return Array.isArray(data) ? data : (data.data || []);
}

// Detalj (public)
export async function fetchWorkout(id) {
  const { data } = await api.get(`/workouts/${id}`);
  return data.data || data;
}

// Samo treninzi ulogovanog korisnika (member/admin)
export async function fetchMyWorkouts() {
  const { data } = await api.get("/users/workouts");
  return Array.isArray(data) ? data : (data.data || []);
}

// Kreiranje (member/admin)
export async function createWorkout(payload) {
  const { data } = await api.post("/users/workouts", payload);
  return data.data || data;
}

// Izmena (member vlasnik / admin)
export async function updateWorkout(id, payload) {
  const { data } = await api.put(`/users/workouts/${id}`, payload);
  return data.data || data;
}

// Brisanje (member vlasnik / admin)
export async function deleteWorkout(id) {
  const { data } = await api.delete(`/users/workouts/${id}`);
  return data;
}
