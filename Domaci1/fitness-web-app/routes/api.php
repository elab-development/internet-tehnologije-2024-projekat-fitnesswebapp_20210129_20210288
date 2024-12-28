<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\WorkoutController;

// Breeze autentifikacione rute
Route::post('/register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'store']);
Route::post('/login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy']);
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// API rute za aplikaciju
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

// Rute za Workout API - CRUD operacije
Route::apiResource('workouts', WorkoutController::class);

// Rute za startovanje treninga
Route::post('/workouts/{id}/start', [WorkoutController::class, 'startWorkout']);

// Rute za prikaz treninga korisnika
Route::get('/users/{id}/workouts', [WorkoutController::class, 'getUserWorkouts']);

// Rute za brisanje treninga korisnika
Route::delete('/users/{id}/workouts', [WorkoutController::class, 'deleteUserWorkouts']);
