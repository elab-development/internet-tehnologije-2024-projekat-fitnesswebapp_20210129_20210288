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
$validated = $this->validateWorkout($request);

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

$validated = $this->validateWorkout($request);

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

// Dodatna metoda za validaciju - smanjeno ponavljanje koda
private function validateWorkout(Request $request)
{
return $request->validate([
'user_id' => 'required|integer|exists:users,id',
'name' => 'required|string|max:255',
'description' => 'nullable|string',
'duration' => 'required|integer|min:1',
'calories_burned' => 'required|integer|min:1',
     ]);
    }
}