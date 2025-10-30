<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Workout;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Resources\WorkoutResource;

class WorkoutController extends Controller
{
    //  Dohvatanje svih treninga
    public function index()
    {
        $user = Auth::user(); // Korisnik ulogovan preko tokena

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Pravila pristupa
        if ($user->role === 'admin') {
            $workouts = Workout::latest()->get(); // Admin vidi sve
        } elseif ($user->role === 'member') {
            $workouts = Workout::where('user_id', $user->id)->latest()->get(); // Member vidi samo svoje
        } else { // Guest
            $workouts = Workout::latest()->get(); // Guest vidi sve (read-only)
        }

        return response()->json([
            'status' => 'success',
            'data' => $workouts
        ], 200);
    }

    //  Dohvatanje treninga po ID-u
    public function show($id)
    {
        try {
            $workout = Workout::findOrFail($id);
            $user = Auth::user();

            if (!$user) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            // Pravila pristupa
            if ($user->role === 'admin') {
                // Admin vidi sve
            } elseif ($user->role === 'member' && $workout->user_id !== $user->id) {
                return response()->json(['message' => 'Forbidden'], 403);
            } elseif ($user->role === 'guest') {
                // Guest ima read-only pristup svima
            }

            return response()->json([
                'status' => 'success',
                'data' => $workout
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Workout not found'
            ], 404);
        }
    }

    //  Kreiranje novog treninga (member/admin)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration' => 'required|integer|min:1',
            'calories_burned' => 'required|integer|min:1',
        ]);

        $validated['user_id'] = Auth::id();
        $workout = Workout::create($validated);

        return response()->json([
            'status' => 'success',
            'data' => $workout
        ], 201);
    }

    //  Ažuriranje treninga (vlasnik ili admin)
public function update(Request $request, $id)
{
    $user = Auth::user();

    // 404 ako ne postoji
    $workout = Workout::find($id);
    if (!$workout) {
        return response()->json(['message' => 'Workout not found'], 404);
    }

    // Dozvola: vlasnik ili admin
    if ($user->role !== 'admin' && $workout->user_id !== $user->id) {
        return response()->json(['message' => 'Forbidden'], 403);
    }

    // Partial update
    $validated = $request->validate([
        'name'            => 'sometimes|required|string|max:255',
        'description'     => 'sometimes|nullable|string',
        'duration'        => 'sometimes|integer|min:1',
        'calories_burned' => 'sometimes|integer|min:1',
        'status'          => 'sometimes|string|in:pending,started,completed',
    ]);

    $workout->update($validated);

    return response()->json([
        'status'  => 'success',
        'message' => 'Workout successfully modified',
        'id'      => $workout->id,  
    ], 200);
}


    //  Brisanje treninga po ID-u
    public function destroy($id)
    {
        try {
            $workout = Workout::findOrFail($id);
            $user = Auth::user();

            if ($user->role !== 'admin' && $workout->user_id !== $user->id) {
                return response()->json(['message' => 'Forbidden'], 403);
            }

            $workout->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Workout deleted'
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Workout not found'
            ], 404);
        }
    }

    //  Pokretanje treninga
    public function startWorkout($id)
    {
        $workout = Workout::find($id);

        if (!$workout) {
            return response()->json(['message' => 'Workout not found'], 404);
        }

        $workout->status = 'started';
        $workout->save();

        return response()->json([
            'message' => 'Workout started',
            'data' => $workout
        ], 200);
    }

    //  Dohvatanje treninga određenog korisnika
    public function getUserWorkouts()
    {
        $userId = Auth::id();

        if (!$userId) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $workouts = Workout::where('user_id', $userId)->get();

        if ($workouts->isEmpty()) {
            return response()->json(['message' => 'No workouts found for this user'], 404);
        }

        return response()->json([
            'message' => 'Workouts retrieved successfully',
            'data' => $workouts
        ], 200);
    }

    // Brisanje svih treninga korisnika
    public function deleteUserWorkouts()
    {
        $userId = Auth::id();

        if (!$userId) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $deletedCount = Workout::where('user_id', $userId)->delete();

        if ($deletedCount == 0) {
            return response()->json(['message' => 'No workouts found for this user'], 404);
        }

        return response()->json(['message' => 'All workouts for the user have been deleted'], 200);
    }
}
