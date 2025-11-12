<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exercise;

class ExerciseController extends Controller
{
    // Vraća sve vežbe zajedno sa osnovnim podacima o pripadajućem workout-u
    public function index()
    {
        $exercises = Exercise::with(['workout:id,user_id,name'])->get();
        return response()->json($exercises, 200);
    }

    // Kreira novu vežbu
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name'         => 'required|string|max:255',
            'description'  => 'nullable|string',
            'reps_or_time' => 'required|integer',
            'type'         => 'required|string|max:255',
            'workout_id'   => 'required|exists:workouts,id',
        ]);

        $exercise = Exercise::create($validatedData);
        $exercise->load(['workout:id,user_id,name']);

        return response()->json([
            'message'  => 'Exercise successfully created.',
            'exercise' => $exercise,
        ], 201);
    }

    // Vraća jednu vežbu
    public function show($id)
    {
        $exercise = Exercise::with(['workout:id,user_id,name'])->find($id);

        if (!$exercise) {
            return response()->json(['message' => 'Exercise not found.'], 404);
        }

        return response()->json($exercise, 200);
    }

    // Ažurira postojeću vežbu
    public function update(Request $request, $id)
    {
        $exercise = Exercise::find($id);
        if (!$exercise) {
            return response()->json(['message' => 'Exercise not found.'], 404);
        }

        $validatedData = $request->validate([
            'name'         => 'sometimes|required|string|max:255',
            'description'  => 'nullable|string',
            'reps_or_time' => 'sometimes|required|integer',
            'type'         => 'sometimes|required|string|max:255',
            'workout_id'   => 'sometimes|required|exists:workouts,id',
        ]);

        $exercise->update($validatedData);
        $exercise->load(['workout:id,user_id,name']);

        return response()->json([
            'message'  => 'Exercise successfully updated.',
            'exercise' => $exercise,
        ], 200);
    }

    // Briše vežbu
    public function destroy($id)
    {
        $exercise = Exercise::find($id);

        if (!$exercise) {
            return response()->json(['message' => 'Exercise not found.'], 404);
        }

        $exercise->delete();

        return response()->json([
            'message' => 'Exercise successfully deleted.',
        ], 200);
    }
}
