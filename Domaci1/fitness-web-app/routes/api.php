<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\AdminController;

// Rute dostupne SVIMA (gostima)
Route::get('/workouts', [WorkoutController::class, 'index']); // Prikaz svih treninga
Route::get('/workouts/{id}', [WorkoutController::class, 'show']); // Prikaz jednog treninga

// Rute za registraciju i prijavu
Route::post('/register', [AuthController::class, 'register']); // Registracija korisnika
Route::post('/login', [AuthController::class, 'login']); // Prijava korisnika

// Logout ruta (samo za ulogovane korisnike)
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// RUTE ZA ČLANOVE (MEMBER)
Route::middleware(['auth:sanctum', \App\Http\Middleware\RoleMiddleware::class . ':member'])
    ->group(function () {
        Route::post('/workouts', [WorkoutController::class, 'store']); // Dodavanje treninga
        Route::put('/workouts/{id}', [WorkoutController::class, 'update']); // Ažuriranje treninga
        Route::delete('/workouts/{id}', [WorkoutController::class, 'destroy']); // Brisanje treninga

        // Rute za vežbe (CRUD)
        Route::apiResource('exercises', ExerciseController::class);
    });

// RUTE ZA ADMINISTRATORA (ADMIN)
Route::middleware(['auth:sanctum', \App\Http\Middleware\RoleMiddleware::class . ':admin'])
    ->group(function () {
        Route::get('/admin/users', [AdminController::class, 'listUsers']); // Lista svih korisnika
        Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']); // Brisanje korisnika

        // Rute za ciljeve (CRUD)
        Route::apiResource('goals', GoalController::class);
    });

// TEST RUTA - Provera da li API radi
Route::get('/test', function () {
    return response()->json(['message' => 'API radi!']);
});
