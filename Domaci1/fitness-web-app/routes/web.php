<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\WeatherController;

// Početna ruta – prikazuje welcome stranicu
Route::get('/', function () {
    return view('welcome');
});

// ---------------- RUTE ZA GOSTE ----------------
// Ove rute su dostupne samo gostima (neulogovani korisnici)
Route::middleware(['auth:sanctum', \App\Http\Middleware\RoleMiddleware::class . ':guest'])->group(function () {
    // Gostima je omogućeno samo pregledanje dostupnih treninga
    Route::get('/workouts', [WorkoutController::class, 'index']);
});

// ---------------- RUTE ZA ČLANOVE ----------------
// Ove rute su dostupne samo članovima (member)
Route::middleware(['auth:sanctum', \App\Http\Middleware\RoleMiddleware::class . ':member'])->group(function () {
    // Članovi mogu dodavati, ažurirati i brisati treninge
    Route::resource('workouts', WorkoutController::class);
});

// ---------------- RUTE ZA ADMINA ----------------
// Ove rute su dostupne samo administratorima (admin)
Route::middleware(['auth:sanctum', \App\Http\Middleware\RoleMiddleware::class . ':admin'])->group(function () {
    // Admin dashboard stranica
    Route::get('/admin', function () {
        return view('admin.dashboard');
    });
});

// ---------------- RUTA ZA VREMENSKU PROGNOZU ----------------
// Omogućava dobijanje vremenske prognoze za određeni grad
Route::get('/weather/{city}', [WeatherController::class, 'getWeather']);
