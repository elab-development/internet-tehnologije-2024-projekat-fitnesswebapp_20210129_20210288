<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class NewPasswordController extends Controller
{
    /**
     * Obrada zahteva za resetovanje lozinke.
     * 
     * Prihvata zahtev koji sadrži token, email i novu lozinku,
     * validira podatke i resetuje lozinku ako su podaci ispravni.
     *
     * @throws \Illuminate\Validation\ValidationException Ako se desi greška prilikom validacije
     */
    public function store(Request $request): JsonResponse
    {
        // Validacija unetih podataka
        $request->validate([
            'token' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
        
        // Pokušaj resetovanja lozinke korisnika
        // Ako je uspešno, ažuriraćemo lozinku u bazi podataka
        // U suprotnom, obradićemo grešku i vratiti odgovarajući odgovor
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                // Ažuriranje lozinke korisnika i generisanje novog remember tokena
                $user->forceFill([
                    'password' => Hash::make($request->string('password')),
                    'remember_token' => Str::random(60),
                ])->save();
                
                // Pokretanje događaja za resetovanje lozinke
                event(new PasswordReset($user));
            }
        );
        
        // Provera statusa resetovanja lozinke
        // Ako resetovanje nije uspelo, bacamo ValidationException sa odgovarajućom porukom
        if ($status != Password::PASSWORD_RESET) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }
        
        // Vraćanje JSON odgovora sa statusom uspešnog resetovanja
        return response()->json(['status' => __($status)]);
    }
}