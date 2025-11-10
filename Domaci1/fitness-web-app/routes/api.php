<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\WeatherController;

// --- PUBLIC (bez tokena)
Route::get('/weather/{city}', [WeatherController::class, 'getWeather']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/guest/login', [AuthController::class, 'loginAsGuest']);

// --- LOGOUT 
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// --- WORKOUTS: dostupno SVIM ulogovanim korisnicima (guest, member, admin)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/workouts', [WorkoutController::class, 'index']);    
    Route::get('/workouts/{id}', [WorkoutController::class, 'show']); 
});

// --- MEMBER (i admin)
Route::middleware(['auth:sanctum', \App\Http\Middleware\RoleMiddleware::class . ':member'])
    ->group(function () {
        // Users workouts CRUD (sopstveni ili admin)
        Route::post('/users/workouts', [WorkoutController::class, 'store']);
        Route::put('/users/workouts/{id}', [WorkoutController::class, 'update']);
        Route::delete('/users/workouts/{id}', [WorkoutController::class, 'destroy']);
        Route::get('/users/workouts', [WorkoutController::class, 'getUserWorkouts']);

        // Exercises CRUD
        Route::apiResource('exercises', ExerciseController::class);
    });

// --- ADMIN
Route::middleware(['auth:sanctum', \App\Http\Middleware\RoleMiddleware::class . ':admin'])
    ->group(function () {
        Route::get('/admin/users', [AdminController::class, 'listUsers']);
        Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);

        // Goals CRUD
        Route::apiResource('goals', GoalController::class);
    });

// --- TEST
Route::get('/test', function () {
    return response()->json(['message' => 'API radi!']);
});
