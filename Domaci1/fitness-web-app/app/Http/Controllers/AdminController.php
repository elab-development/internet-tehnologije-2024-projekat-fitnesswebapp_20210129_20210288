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

   // Dohvata i vraća listu svih korisnika u JSON formatu
    public function listUsers()
    {
        $users = User::all();

        return response()->json($users);
    }

    // Briše korisnika po ID-ju
    public function deleteUser($id)
    {
        $user = User::find($id);

        // Proverava da li korisnik postoji
        if (!$user) {
            return response()->json(['message' => 'Korisnik nije pronađen'], 404);
        }

        // Briše korisnika
        $user->delete();

        // Vraća poruku o uspešnom brisanju
        return response()->json(['message' => 'Korisnik uspešno obrisan']);
    }
}
