<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Workout;

class WorkoutController extends Controller
{
    // GET /api/workouts - Prikazuje sve treninge
    public function index()
    {
        return Workout::all();
    }

    // GET /api/workouts/{id} - Prikazuje određeni trening
    public function show($id)
    {
        return Workout::findOrFail($id);
    }

    // POST /api/workouts - Kreira novi trening
    public function store(Request $request)
    {
    $validated = $request->validate([
    'user_id' => 'required|integer|exists:users,id', // Proverava da li postoji korisnik sa datim ID-om
    'name' => 'required|string|max:255',
    'description' => 'nullable|string',
    'duration' => 'required|integer|min:1', // Očekuje trajanje u minutima
    'calories_burned' => 'required|integer|min:1', // Očekuje kalorije koje su sagorevane
    ]);
    
    $workout = Workout::create($validated);
    
    return response()->json($workout, 201);
    }

    // PUT /api/workouts/{id} - Ažurira postojeći trening
    public function update(Request $request, $id)
    {
        $workout = Workout::findOrFail($id);

        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration' => 'required|integer|min:1',
            'calories_burned' => 'required|integer|min:1',
            ]);
            
            $workout->update($validated);
            
            return response()->json($workout);
    }

    // DELETE /api/workouts/{id} - Briše trening
    public function destroy($id)
    {
        $workout = Workout::findOrFail($id);
        $workout->delete();
        return response()->json(null, 204);
    }

}