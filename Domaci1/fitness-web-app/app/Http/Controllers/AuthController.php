<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    
    public function register(Request $request)
    {
        // Validacija unosa
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,member,guest',
        ]);

        // Provera da li validacija nije uspela
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Kreiranje korisnika
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        // Provera da li postoji metoda `createToken`
        if (!method_exists($user, 'createToken')) {
            return response()->json(['error' => 'Sanctum nije ispravno konfigurisan.'], 500);
        }

        // Kreiranje API tokena
        $token = $user->createToken('auth_token')->plainTextToken;

        // Vraćanje odgovora sa tokenom i informacijama o korisniku
        return response()->json([
            'message' => 'User registered successfully',
            'token' => $token,
            'user' => $user
        ], 201);
    }

    
    public function login(Request $request)
    {
        // Validacija unosa
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Pronalaženje korisnika po email-u
        $user = User::where('email', $request->email)->first();

        // Provera da li korisnik postoji i da li je lozinka tačna
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Kreiranje API tokena
        $token = $user->createToken('auth_token')->plainTextToken;

        // Vraćanje odgovora sa tokenom i informacijama o korisniku
        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user
        ], 200);
    }

    
    public function logout()
    {
        // Brisanje svih tokena trenutno prijavljenog korisnika
        \Auth::user()->tokens()->delete();

        // Vraćanje odgovora o uspešnoj odjavi
        return response()->json(['message' => 'Logged out'], 200);
    }
}