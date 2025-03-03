<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisteredUserController extends Controller
{
    /**
     * Obrada zahteva za registraciju novog korisnika.
     * 
     * Prihvata zahtev koji sadrži podatke o korisniku,
     * validira ih, kreira novog korisnika i generiše
     * pristupni token za autentifikaciju.
     */
    public function store(Request $request)
    {
        // Validacija podataka o korisniku
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|confirmed|min:8',
            'role' => 'required|string|in:admin,member',
        ]);
        
        // Kreiranje novog korisnika sa validiranim podacima
        // Lozinka se hashira pre čuvanja u bazi
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);
       
        // Generisanje pristupnog tokena za autentifikaciju
        $token = $user->createToken('auth_token')->plainTextToken;
        
        // Vraćanje JSON odgovora sa podacima o korisniku i tokenom
        // Status kod 201 označava da je resurs uspešno kreiran
        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }
}