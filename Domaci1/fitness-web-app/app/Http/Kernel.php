<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;
use App\Http\Middleware\PreventRequestsDuringMaintenance;
use App\Http\Middleware\TrimStrings;
use App\Http\Middleware\EncryptCookies;
use App\Http\Middleware\VerifyCsrfToken;
use App\Http\Middleware\Authenticate;

class Kernel extends HttpKernel
{
    // Globalni middleware koji se primenjuju na sve HTTP zahteve
    protected $middleware = [
        PreventRequestsDuringMaintenance::class, 
        TrimStrings::class, 
        EncryptCookies::class, 
        VerifyCsrfToken::class, 
        \Illuminate\Http\Middleware\TrustHosts::class,
        \Illuminate\Http\Middleware\TrustProxies::class, 
        \Illuminate\Http\Middleware\HandleCors::class, 
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class, 
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class, 
    ];

    // Middleware grupe za različite tipove ruta
    protected $middlewareGroups = [
        // Middleware grupa za web aplikaciju
        'web' => [
            EncryptCookies::class,
            TrimStrings::class,
            VerifyCsrfToken::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        // Middleware grupa za API rute
        'api' => [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class, // Za Sanctum autentifikaciju
            'throttle:api', 
            \Illuminate\Routing\Middleware\SubstituteBindings::class, 
        ],
    ];

    // Middleware koji se mogu dodeliti pojedinačnim rutama
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class, // Proverava da li je korisnik ulogovan
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class, // Omogućava osnovnu HTTP autentifikaciju
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class, // Podešava keširanje odgovora
        'role' => \App\Http\Middleware\RoleMiddleware::class, // Omogućava ograničavanje ruta na osnovu korisničke uloge
    ];
}
