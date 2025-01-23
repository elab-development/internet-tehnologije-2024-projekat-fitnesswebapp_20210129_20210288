<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\ExerciseController;

// Rute za Exercise API - CRUD operacije
Route::post('/exercises', [ExerciseController::class, 'store']);

// Rute za Exercise API - CRUD operacije
Route::apiResource('exercises', ExerciseController::class);

// Breeze autentifikacione rute
Route::post('/register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'store']);
Route::post('/login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);
Route::middleware('auth:sanctum')->post('/logout', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy']);
Route::post('/forgot-password', [\App\Http\Controllers\Auth\PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [\App\Http\Controllers\Auth\NewPasswordController::class, 'store']);
Route::post('/email/verification-notification', [\App\Http\Controllers\Auth\EmailVerificationNotificationController::class, 'store']);
Route::get('/verify-email/{id}/{hash}', [\App\Http\Controllers\Auth\VerifyEmailController::class, '__invoke'])->name('verification.verify');

// Rute za Goal API - CRUD operacije
Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('goals', GoalController::class);
});

// Ruta za autentifikovanog korisnika
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// API test ruta za proveru
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

// Zaštićene rute za autentifikovane korisnike
Route::middleware(['auth:sanctum'])->group(function () {
    // Rute za Workout API - CRUD operacije
    Route::apiResource('workouts', WorkoutController::class);

    // Ruta za startovanje treninga
    Route::post('/workouts/{id}/start', [WorkoutController::class, 'startWorkout']);

    // Rute za prikaz treninga korisnika
    Route::get('/users/{id}/workouts', [WorkoutController::class, 'getUserWorkouts']);

    // Rute za brisanje svih treninga korisnika
    Route::delete('/users/{id}/workouts', [WorkoutController::class, 'deleteUserWorkouts']);
});
