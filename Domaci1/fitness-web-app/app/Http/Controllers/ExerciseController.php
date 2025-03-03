<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exercise;

class ExerciseController extends Controller
{
    /**
     * Prikazuje listu svih vežbi.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Dohvata sve vežbe iz baze podataka
        $exercises = Exercise::all();

        // Vraća listu vežbi kao JSON odgovor
        return response()->json($exercises, 200);
    }

    /**
     * Kreira novu vežbu.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validacija unosa
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'reps_or_time' => 'required|integer',
            'type' => 'required|string|max:255',
            'workout_id' => 'required|exists:workouts,id',
        ]);

        // Kreiranje nove vežbe
        $exercise = Exercise::create($validatedData);

        // Vraćanje odgovora sa porukom i kreiranom vežbom
        return response()->json([
            'message' => 'Exercise successfully created.',
            'exercise' => $exercise,
        ], 201);
    }

    
public function show($id)
    {
        // Pronalaženje vežbe po ID-ju
        $exercise = Exercise::find($id);

        // Provera da li vežba postoji
        if (!$exercise) {
            return response()->json([
                'message' => 'Exercise not found.',
            ], 404);
        }

        // Vraćanje vežbe kao JSON odgovor
        return response()->json($exercise, 200);
    }

   
    public function update(Request $request, $id)
    {
        // Pronalaženje vežbe po ID-ju
        $exercise = Exercise::find($id);

        // Provera da li vežba postoji
        if (!$exercise) {
            return response()->json([
                'message' => 'Exercise not found.',
            ], 404);
        }

        // Validacija unosa (koristi `sometimes` za opciona polja)
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'reps_or_time' => 'sometimes|required|integer',
            'type' => 'sometimes|required|string|max:255',
            'workout_id' => 'sometimes|required|exists:workouts,id',
        ]);

        // Ažuriranje vežbe
        $exercise->update($validatedData);

        // Vraćanje odgovora sa porukom i ažuriranom vežbom
        return response()->json([
            'message' => 'Exercise successfully updated.',
            'exercise' => $exercise,
        ], 200);
    }

    /**
     * Briše vežbu.
     *
     * @param int $id ID vežbe
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        // Pronalaženje vežbe po ID-ju
        $exercise = Exercise::find($id);

        // Provera da li vežba postoji
        if (!$exercise) {
            return response()->json([
                'message' => 'Exercise not found.',
            ], 404);
        }

        // Brisanje vežbe
        $exercise->delete();

        // Vraćanje odgovora sa porukom o uspešnom brisanju
        return response()->json([
            'message' => 'Exercise successfully deleted.',
        ], 200);
    }
}