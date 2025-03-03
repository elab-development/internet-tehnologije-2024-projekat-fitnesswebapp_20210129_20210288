<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    
    public function store(Request $request)
    {
        // Validacija podataka iz zahteva.
        // Email i lozinka su obavezni, a email mora biti u ispravnom formatu.
        $credentials = $request->validate([
            'email' => ['required', 'email'],  // Email je obavezan i mora biti u ispravnom formatu.
            'password' => ['required'],       // Lozinka je obavezna.
        ]);

        // Pokušaj autentifikacije korisnika.
        // Ako autentifikacija ne uspe, vraća se odgovor sa statusom 401 (Unauthorized).
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Neispravni podaci za prijavu'], 401);
        }

        // Dobijanje trenutno prijavljenog korisnika.
        $user = Auth::user();

        // Generisanje tokena za autentifikaciju.
        // Token se kreira koristeći Laravel Sanctum i vezuje se za korisnika.
        $token = $user->createToken('auth_token')->plainTextToken;

        // Vraćanje JSON odgovora sa tokenom i porukom o uspešnoj prijavi.
        return response()->json([
            'message' => 'Prijava uspešna',
            'access_token' => $token,  // Generisani token.
            'token_type' => 'Bearer', // Tip tokena (Bearer token).
        ], 200);
    }

   
    public function destroy(Request $request)
    {
        // Brisanje svih tokena trenutno prijavljenog korisnika.
        // Ovo efektivno vrši odjavu korisnika.
        $request->user()->tokens()->delete();

        // Vraćanje JSON odgovora sa porukom o uspešnoj odjavi.
        return response()->json(['message' => 'Odjava uspešna'], 200);
    }
}