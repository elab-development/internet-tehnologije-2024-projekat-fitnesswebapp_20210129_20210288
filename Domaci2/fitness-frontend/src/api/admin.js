// src/api/admin.js
import { api } from "./client";

/** Vrati listu korisnika (admin only) */
export async function fetchUsers() {
  const { data } = await api.get("/admin/users");
  return Array.isArray(data) ? data : (data.data || []);
}

/** FILTRIRANJE na frontu (ne postoji ruta /admin/users/{id} ) */
export async function fetchUserById(id) {
   // Preuzmi listu svih korisnika
  const users = await fetchUsers();

  // Ako podaci nisu niz, vrati null
  if (!Array.isArray(users)) return null;

  // Pronađi korisnika čiji se ID poklapa
  const user = users.find(u => String(u.id) === String(id));

  // Vrati korisnika ili null ako nije pronađen
  return user || null;
}

/** Brisanje korisnika po id (admin only) */
export async function deleteUser(id) {
  const { data } = await api.delete(`/admin/users/${id}`); // obrisi prema id
  return data;
}
