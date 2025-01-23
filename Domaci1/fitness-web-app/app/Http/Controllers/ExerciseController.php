<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exercise;

class ExerciseController extends Controller
{
    /**
     * Prikaz svih vežbi.
     */
    public function index()
    {
        return response()->json(Exercise::all(), 200);
    }

    /**
     * Kreiranje nove vežbe.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'reps_or_time' => 'required|integer',
            'type' => 'required|string|max:255',
            'workout_id' => 'required|exists:workouts,id',
        ]);

        $exercise = Exercise::create($validatedData);

        return response()->json([
            'message' => 'Exercise successfully created.',
            'exercise' => $exercise,
        ], 201);
    }

    /**
     * Prikaz određene vežbe.
     */
    public function show($id)
    {
        $exercise = Exercise::find($id);

        if (!$exercise) {
            return response()->json([
                'message' => 'Exercise not found.',
            ], 404);
        }

        return response()->json($exercise, 200);
    }

    /**
     * Ažuriranje vežbe.
     */
    public function update(Request $request, $id)
    {
        $exercise = Exercise::find($id);

        if (!$exercise) {
            return response()->json([
                'message' => 'Exercise not found.',
            ], 404);
        }

        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'reps_or_time' => 'sometimes|required|integer',
            'type' => 'sometimes|required|string|max:255',
            'workout_id' => 'sometimes|required|exists:workouts,id',
        ]);

        $exercise->update($validatedData);

        return response()->json([
            'message' => 'Exercise successfully updated.',
            'exercise' => $exercise,
        ], 200);
    }

    /**
     * Brisanje vežbe.
     */
    public function destroy($id)
    {
        $exercise = Exercise::find($id);

        if (!$exercise) {
            return response()->json([
                'message' => 'Exercise not found.',
            ], 404);
        }

        $exercise->delete();

        return response()->json([
            'message' => 'Exercise successfully deleted.',
        ], 200);
    }
}
