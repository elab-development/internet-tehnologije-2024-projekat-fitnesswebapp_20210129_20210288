<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\AdminController;

// Rute dostupne SVIMA (uključujući goste)
Route::get('/workouts', [WorkoutController::class, 'index']);
Route::get('/workouts/{id}', [WorkoutController::class, 'show']);

// Rute za registraciju i prijavu
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Logout ruta (samo za ulogovane korisnike)
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Rute za **ulogovane korisnike (MEMBER)**
Route::middleware(['auth:sanctum', \App\Http\Middleware\RoleMiddleware::class . ':member'])->group(function () {
    Route::post('/workouts', [WorkoutController::class, 'store']);
    Route::put('/workouts/{id}', [WorkoutController::class, 'update']);
    Route::delete('/workouts/{id}', [WorkoutController::class, 'destroy']);

    // Memberi mogu dodavati i uređivati vežbe
    Route::apiResource('exercises', ExerciseController::class);
});

// Rute samo za ADMINA
Route::middleware(['auth:sanctum', \App\Http\Middleware\RoleMiddleware::class . ':admin'])->group(function () {
    Route::get('/admin/users', [AdminController::class, 'listUsers']);
    Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);

    // Admin može dodavati i menjati ciljeve
    Route::apiResource('goals', GoalController::class);
});

// TEST RUTA 
Route::get('/test', function () {
    return response()->json(['message' => 'API radi!']);
});
