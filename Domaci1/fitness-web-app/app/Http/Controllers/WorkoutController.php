<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Workout;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class WorkoutController extends Controller
{
    // GET /api/workouts
    public function index()
    {
        $workouts = Workout::all();

        return response()->json([
            'status' => 'success',
            'data' => $workouts
        ], 200);
    }

    // GET /api/workouts/{id}
    public function show($id)
    {
        try {
            $workout = Workout::findOrFail($id);

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

    // POST /api/workouts
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration' => 'required|integer|min:1',
            'calories_burned' => 'required|integer|min:1',
        ]);

        // Automatski dodaj user_id iz autentifikacije
        $validated['user_id'] = auth()->id();

        $workout = Workout::create($validated);

        return response()->json([
            'status' => 'success',
            'data' => $workout
        ], 201);
    }

    // PUT /api/workouts/{id}
    public function update(Request $request, $id)
    {
        try {
            $workout = Workout::findOrFail($id);

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'duration' => 'required|integer|min:1',
                'calories_burned' => 'required|integer|min:1',
            ]);

            $workout->update($validated);

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

    // DELETE /api/workouts/{id}
    public function destroy($id)
    {
        try {
            $workout = Workout::findOrFail($id);

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

    // Start Workout
    public function startWorkout($id)
    {
        $workout = Workout::find($id);

        if (!$workout) {
            return response()->json(['message' => 'Workout not found'], 404);
        }

        // Logika za pokretanje treninga
        $workout->status = 'started';
        $workout->save();

        return response()->json([
            'message' => 'Workout started',
            'data' => $workout
        ], 200);
    }

    // Get User Workouts
    public function getUserWorkouts()
    {
        $userId = auth()->id();
        $workouts = Workout::where('user_id', $userId)->get();

        if ($workouts->isEmpty()) {
            return response()->json(['message' => 'No workouts found for this user'], 404);
        }

        return response()->json([
            'message' => 'Workouts retrieved successfully',
            'data' => $workouts
        ], 200);
    }

    // Delete User Workouts
    public function deleteUserWorkouts()
    {
        $userId = auth()->id();
        $workouts = Workout::where('user_id', $userId);

        if ($workouts->count() == 0) {
            return response()->json(['message' => 'No workouts found for this user'], 404);
        }

        $workouts->delete();

        return response()->json(['message' => 'All workouts for the user have been deleted'], 200);
    }
}
