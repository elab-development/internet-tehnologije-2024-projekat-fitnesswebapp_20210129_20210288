<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validacija unosa
        $validator = Validator::make($request->all(), [
            'name'          => 'required|string|max:255',
            'email'         => 'required|string|email|unique:users',
            'password'      => 'required|string|min:8',
            'role'          => 'required|in:admin,member,guest',
            'fitness_level' => 'required|in:beginner,intermediate,expert',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Kreiranje korisnika u bazi podataka
        $user = User::create([
            'name'              => $request->name,
            'email'             => $request->email,
            'password'          => Hash::make($request->password),
            'role'              => $request->role,
            'fitness_level'     => $request->fitness_level,
            'email_verified_at' => now(),           
            'remember_token'    => Str::random(60),  
        ]);

        // Provera da li je metoda createToken dostupna
        if (!method_exists($user, 'createToken')) {
            return response()->json(['error' => 'Sanctum nije ispravno konfigurisan.'], 500);
        }

        // Kreiraj API token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'token'   => $token,
            'user'    => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token'   => $token,
            'user'    => $user,
        ], 200);
    }

    public function logout()
    {
        \Auth::user()->tokens()->delete();
        return response()->json(['message' => 'Logged out'], 200);
    }

    // Prijava kao gost korisnik
    public function loginAsGuest(Request $request)
    {
        // Predefinisani podaci za gosta
        $name    = $request->input('name', 'Guest ' . Str::upper(Str::random(4)));
        $fitness = $request->input('fitness_level', 'beginner');
        $email   = 'guest_' . Str::uuid() . '@example.test';

        $user = User::create([
            'name'              => $name,
            'email'             => $email,
            'password'          => Hash::make(Str::random(32)),
            'role'              => 'guest',
            'fitness_level'     => $fitness,
            'email_verified_at' => now(),           
            'remember_token'    => Str::random(60), 
        ]);

        $token = $user->createToken('guest_token')->plainTextToken;

        return response()->json([
            'message' => 'Guest account created',
            'token'   => $token,
            'user'    => [
                'id'             => $user->id,
                'name'           => $user->name,
                'role'           => $user->role,
                'fitness_level'  => $user->fitness_level,
                'email_verified' => (bool) $user->email_verified_at,
            ],
        ], 201);
    }
}
