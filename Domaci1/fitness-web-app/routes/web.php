<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\WeatherController;

Route::get('/', function () {
    return view('welcome');
});

// Rute za guest korisnike (mogu videti samo javne podatke)
Route::middleware(['auth:sanctum', \App\Http\Middleware\RoleMiddleware::class . ':guest'])->group(function () {
    Route::get('/workouts', [WorkoutController::class, 'index']);
});

// Rute za članove (mogu kreirati treninge)
Route::middleware(['auth:sanctum', \App\Http\Middleware\RoleMiddleware::class . ':member'])->group(function () {
    Route::resource('workouts', WorkoutController::class);
});

// Rute za admina
Route::middleware(['auth:sanctum', \App\Http\Middleware\RoleMiddleware::class . ':admin'])->group(function () {
    Route::get('/admin', function () {
        return view('admin.dashboard');
    });

    
});

Route::get('/weather/{city}', [WeatherController::class, 'getWeather']);
