<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role)
    {
        $user = Auth::user();

        // Ako je ruta za goste, dozvoljava korisnicima koji NISU ulogovani
        if ($role === 'guest') {
            if (!$user) {
                return $next($request);
            }
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Ako korisnik nije ulogovan, vrati 401 Unauthorized
        if (!$user || !isset($user->role)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Ako ruta zahteva member rolu, dozvoli samo memberima i adminima
        if ($role === 'member' && !in_array(strtolower($user->role), ['member', 'admin'])) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        // Ako ruta zahteva admina, dozvoli samo adminima
        if ($role === 'admin' && $user->role !== 'admin') {
            return response()->json(['message' => 'Forbidden - Admin access only'], 403);
        }

        return $next($request);
    }
}
