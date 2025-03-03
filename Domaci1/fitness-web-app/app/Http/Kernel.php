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
    /**
     * Globalni middleware - primenjuje se na sve HTTP zahteve u aplikaciji.
     */
    protected $middleware = [
        PreventRequestsDuringMaintenance::class, // Sprečava pristup aplikaciji tokom održavanja
        TrimStrings::class, // Uklanja praznine sa početka i kraja stringova u inputima
        EncryptCookies::class, // Šifruje kolačiće radi sigurnosti
        VerifyCsrfToken::class, // Sprečava CSRF napade
        \Illuminate\Http\Middleware\TrustHosts::class, // Definiše koje hostove aplikacija može da verifikuje
        \Illuminate\Http\Middleware\TrustProxies::class, // Podešava poverljive proksije
        \Illuminate\Http\Middleware\HandleCors::class, // Omogućava podešavanje CORS pravila
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class, // Ograničava veličinu POST zahteva
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class, // Pretvara prazne stringove u NULL
    ];

    /**
     * Middleware grupe - koriste se za određene tipove ruta (web ili API).
     */
    protected $middlewareGroups = [
        // Middleware grupa za web aplikaciju
        'web' => [
            EncryptCookies::class, // Šifruje kolačiće
            TrimStrings::class, // Uklanja suvišne razmake iz input polja
            VerifyCsrfToken::class, // Sprečava CSRF napade
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class, // Omogućava rad sa dodatnim kolačićima
            \Illuminate\Session\Middleware\StartSession::class, // Pokreće sesije za korisnike
            \Illuminate\View\Middleware\ShareErrorsFromSession::class, // Deli greške iz sesije sa pogledima
            \Illuminate\Routing\Middleware\SubstituteBindings::class, // Omogućava automatsko vezivanje modela u rutama
        ],

        // Middleware grupa za API rute
        'api' => [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class, // Pomaže pri autentifikaciji API korisnika
            'throttle:api', // Ograničava broj API zahteva (rate limiting)
            \Illuminate\Routing\Middleware\SubstituteBindings::class, // Omogućava automatsko vezivanje modela u rutama
        ],
    ];

    /**
     * Middleware za pojedinačne rute - koristi se kada middleware nije deo neke grupe.
     */
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class, // Proverava da li je korisnik ulogovan
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class, // Omogućava osnovnu HTTP autentifikaciju
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class, // Podešava keširanje odgovora
        'role' => \App\Http\Middleware\RoleMiddleware::class, // Omogućava ograničavanje ruta na osnovu korisničke uloge
    ];
}
