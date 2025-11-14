<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// Middleware za proveru uloge korisnika
class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role)
    {
        $user = Auth::user();
        $userRole = $user && isset($user->role) ? strtolower($user->role) : null; 

        // GUEST rute su dostupne ako NEMA tokena ili ako je korisnik sa rolom 'guest'
        if ($role === 'guest') {
            if (!$user || $userRole === 'guest') {
                return $next($request);
            }
            return response()->json(['message' => 'Forbidden'], 403);
        }

        // BEZ tokena nema pristupa member/admin rutama
        if (!$userRole) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // MEMBER: dozvoljeno member i admin
        if ($role === 'member') {
            if (in_array($userRole, ['member', 'admin'], true)) {
                return $next($request);
            }
            return response()->json(['message' => 'Forbidden'], 403);
        }

        // ADMIN: samo admin
        if ($role === 'admin') {
            if ($userRole === 'admin') {
                return $next($request);
            }
            return response()->json(['message' => 'Forbidden - Admin access only'], 403);
        }

        return response()->json(['message' => 'Forbidden'], 403);
    }
}
