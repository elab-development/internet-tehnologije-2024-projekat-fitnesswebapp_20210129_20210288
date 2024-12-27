<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Definišemo API rute
        Route::prefix('api')
            ->middleware('api')
            ->group(base_path('routes/api.php'));

        // Definišemo Web rute
        Route::middleware('web')
            ->group(base_path('routes/web.php'));
    }
}
