<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Auth\Notifications\ResetPassword;
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
        // Definisanje URL-a za reset lozinke (dodato od strane Breeze-a)
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });

        // Učitavanje API ruta
        Route::prefix('api')
            ->middleware('api')
            ->group(base_path('routes/api.php'));

        // Učitavanje Web ruta
        Route::middleware('web')
            ->group(base_path('routes/web.php'));
    }
}
