// src/api/workouts.js

import { api } from "./client";

// 1️ Lista svih (public — /workouts)
export async function fetchWorkouts() {
  const { data } = await api.get("/workouts");
  return Array.isArray(data) ? data : (data.data || []);
}

// 2️ Detalj jednog treninga (public — /workouts/:id)
export async function fetchWorkout(id) {
  const { data } = await api.get(`/workouts/${id}`);
  return data.data || data;
}

// 3️ Samo treninzi ulogovanog korisnika (member/admin — /users/workouts)
export async function fetchMyWorkouts() {
  const { data } = await api.get("/users/workouts");
  return Array.isArray(data) ? data : (data.data || []);
}

// 4️ Kreiranje (POST /users/workouts)
export async function createWorkout(payload) {
  const { data } = await api.post("/users/workouts", payload);
  return data.data || data;
}

// 5️ Izmena (PUT /users/workouts/:id)
export async function updateWorkout(id, payload) {
  const { data } = await api.put(`/users/workouts/${id}`, payload);
  return data.data || data;
}

// 6️ Brisanje (DELETE /users/workouts/:id)
export async function deleteWorkout(id) {
  const { data } = await api.delete(`/users/workouts/${id}`);
  return data;
}
