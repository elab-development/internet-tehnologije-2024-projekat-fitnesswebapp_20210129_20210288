<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    /**
     * Prikazuje sve vežbe.
     */
    public function index()
    {
        $exercises = Exercise::all();

        return response()->json([
            'status' => 'success',
            'data' => $exercises
        ], 200);
    }

    /**
     * Kreira novu vežbu.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration' => 'required|integer|min:1',
            'calories_burned' => 'nullable|integer|min:1',
            'type' => 'required|string|max:255',
            'workout_id' => 'required|exists:workouts,id',
        ]);



        $exercise = Exercise::create($validated);

        return response()->json([
            'message' => 'Exercise successfully created.',
            'data' => $exercise,
        ], 201);
    }

    /**
     * Prikazuje jednu vežbu.
     */
    public function show($id)
    {
        $exercise = Exercise::find($id);

        if (!$exercise) {
            return response()->json([
                'status' => 'error',
                'message' => 'Exercise not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $exercise
        ], 200);
    }

    /**
     * Ažurira postojeću vežbu.
     */
    public function update(Request $request, $id)
    {
        $exercise = Exercise::find($id);

        if (!$exercise) {
            return response()->json([
                'status' => 'error',
                'message' => 'Exercise not found'
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'duration' => 'sometimes|integer|min:1',
            'calories_burned' => 'nullable|integer|min:0',
            'type' => 'nullable|string|max:255',
        ]);

        $exercise->update($validated);

        return response()->json([
            'status' => 'success',
            'data' => $exercise
        ], 200);
    }

    /**
     * Briše vežbu.
     */
    public function destroy($id)
    {
        $exercise = Exercise::find($id);

        if (!$exercise) {
            return response()->json([
                'status' => 'error',
                'message' => 'Exercise not found'
            ], 404);
        }

        $exercise->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Exercise deleted successfully'
        ], 200);
    }
}
