<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AdminController extends Controller
{
    /**
     * Prikaz admin dashboarda.
     */
    public function dashboard()
    {
        return response()->json([
            'message' => 'Dobrodošli na admin dashboard!',
        ]);
    }

    /**
     * Lista svih korisnika.
     */
    public function listUsers()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Brisanje korisnika po ID-ju.
     */
    public function deleteUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Korisnik nije pronađen'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'Korisnik uspešno obrisan']);
    }
}
