// src/api/admin.js
import { api } from "./client";

/** Vrati listu korisnika (admin only) */
export async function fetchUsers() {
  const { data } = await api.get("/admin/users");
  return Array.isArray(data) ? data : (data.data || []);
}

/** FILTRIRANJE na frontu (ne postoji ruta /admin/users/{id} ) */
export async function fetchUserById(id) {
  const list = await fetchUsers();
  return (Array.isArray(list) ? list : []).find(u => String(u.id) === String(id)) || null; // izvuci prema id
}

/** Brisanje korisnika po id (admin only) */
export async function deleteUser(id) {
  const { data } = await api.delete(`/admin/users/${id}`); // obrisi prema id
  return data;
}
