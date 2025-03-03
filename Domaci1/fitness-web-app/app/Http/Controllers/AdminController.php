<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AdminController extends Controller
{
    /**
     * Prikazuje admin dashboard.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function dashboard()
    {
        // Vraća JSON odgovor sa porukom dobrodošlice
        return response()->json([
            'message' => 'Dobrodošli na admin dashboard!',
        ]);
    }

    /**
     * Prikazuje listu svih korisnika.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function listUsers()
    {
        // Dohvata sve korisnike iz baze podataka
        $users = User::all();

        // Vraća listu korisnika kao JSON odgovor
        return response()->json($users);
    }

    /**
     * Briše korisnika na osnovu ID-ja.
     *
     * @param int $id ID korisnika koji se briše
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteUser($id)
    {
        // Pronalazi korisnika po ID-ju
        $user = User::find($id);

        // Proverava da li korisnik postoji
        if (!$user) {
            // Ako korisnik ne postoji, vraća odgovor sa statusom 404
            return response()->json(['message' => 'Korisnik nije pronađen'], 404);
        }

        // Briše korisnika iz baze podataka
        $user->delete();

        // Vraća poruku o uspešnom brisanju
        return response()->json(['message' => 'Korisnik uspešno obrisan']);
    }
}