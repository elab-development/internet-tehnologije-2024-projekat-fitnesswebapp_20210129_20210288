<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;

// Rute za autentifikaciju (Breeze)
Route::post('/register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'store']);
Route::post('/login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);
Route::middleware('auth:sanctum')->post('/logout', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy']);
Route::post('/forgot-password', [\App\Http\Controllers\Auth\PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [\App\Http\Controllers\Auth\NewPasswordController::class, 'store']);
Route::post('/email/verification-notification', [\App\Http\Controllers\Auth\EmailVerificationNotificationController::class, 'store']);

// Ruta za autentifikovanog korisnika
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// API test ruta
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

// **Workouts Rute** (Za članove)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('workouts', WorkoutController::class);
    Route::post('/workouts/{id}/start', [WorkoutController::class, 'startWorkout']);

    // **Ruta za dobijanje svih treninga korisnika**
    Route::get('/users/{id}/workouts', [WorkoutController::class, 'getUserWorkouts']);

    // **Ruta za brisanje svih treninga korisnika**
    Route::delete('/users/{id}/workouts', [WorkoutController::class, 'deleteUserWorkouts']);
});

// **Rute za Admina**
Route::middleware(['auth:sanctum', \App\Http\Middleware\RoleMiddleware::class . ':admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/admin/users', [AdminController::class, 'listUsers']);
    Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);

    // Admin može upravljati ciljevima (goals)
    Route::apiResource('goals', GoalController::class);
});
