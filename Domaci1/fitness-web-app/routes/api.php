<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WorkoutController;

// API rute za aplikaciju
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

// Rute za Workout API
Route::apiResource('workouts', WorkoutController::class);