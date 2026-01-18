<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Exercise;

class ExerciseController extends Controller
{
    // Vraća vežbe sa paginacijom, filtriranjem i sortiranjem
    public function index(Request $request)
    {
        $query = Exercise::with(['workout:id,user_id,name']);

        // Filtriranje po tipu (type=cardio/strength/flexibility)
        if ($request->filled('type')) {
            $type = strtolower(trim($request->type));  // uklanja razmake i velika slova
            $allowedTypes = ['cardio', 'strength', 'flexibility'];

            if (in_array($type, $allowedTypes, true)) {
                $query->where('type', $type);
            }
        }

        // Pretraga po nazivu/opisu 
        if ($request->filled('search')) {
            $text = mb_strtolower($request->search, 'UTF-8');
            $query->where(function ($q) use ($text) {
                $q->whereRaw('LOWER(name) LIKE ?', ["%{$text}%"])
                    ->orWhereRaw('LOWER(description) LIKE ?', ["%{$text}%"]);
            });
        }

        // Samo moje vežbe (mine=1) – filtrira po vlasniku workout-a
        if ($request->boolean('mine')) {
            $userId = Auth::id();
            if ($userId) {
                $query->whereHas('workout', function ($q) use ($userId) {
                    $q->where('user_id', $userId);
                });
            }
        }

        // Sortiranje: sort=name|type|reps_or_time|id, dir=asc|desc
        $sort = $request->get('sort', 'name');
        $dir  = $request->get('dir', 'asc');

        $allowedSorts = ['id', 'name', 'type', 'reps_or_time'];
        if (!in_array($sort, $allowedSorts, true)) {
            $sort = 'name';
        }

        $query->orderBy($sort, $dir === 'desc' ? 'desc' : 'asc');

        // Paginacija
        $perPage = (int) $request->get('per_page', 10);
        if ($perPage <= 0) {
            $perPage = 10;
        }

        $paginator = $query->paginate($perPage)->appends($request->query());

        return response()->json($paginator, 200);
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
