<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\WorkoutController;

// Breeze autentifikacione rute
Route::post('/register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'store']);
Route::post('/login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);
Route::middleware('auth:sanctum')->post('/logout', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy']);
Route::post('/forgot-password', [\App\Http\Controllers\Auth\PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [\App\Http\Controllers\Auth\NewPasswordController::class, 'store']);
Route::post('/email/verification-notification', [\App\Http\Controllers\Auth\EmailVerificationNotificationController::class, 'store']);
Route::get('/verify-email/{id}/{hash}', [\App\Http\Controllers\Auth\VerifyEmailController::class, '__invoke'])->name('verification.verify');

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

