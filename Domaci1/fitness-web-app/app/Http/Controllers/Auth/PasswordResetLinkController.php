<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class PasswordResetLinkController extends Controller
{
    /**
     * Obrada zahteva za slanje linka za resetovanje lozinke.
     * 
     * Prihvata zahtev koji sadrži email adresu,
     * validira podatke i šalje link za resetovanje lozinke.
     *
     * @throws \Illuminate\Validation\ValidationException Ako se desi greška prilikom validacije
     */
    public function store(Request $request): JsonResponse
    {
        // Validacija email adrese
        $request->validate([
            'email' => ['required', 'email'],
        ]);
        
        // Slanje linka za resetovanje lozinke korisniku
        // Nakon pokušaja slanja, proverićemo odgovor i odrediti
        // poruku koju treba prikazati korisniku
        // Na kraju, vraćamo odgovarajući odgovor
        $status = Password::sendResetLink(
            $request->only('email')
        );
        
        // Provera da li je link za resetovanje uspešno poslat
        // Ako nije, bacamo ValidationException sa odgovarajućom porukom
        if ($status != Password::RESET_LINK_SENT) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }
        
        // Vraćanje JSON odgovora sa statusom uspešnog slanja linka
        return response()->json(['status' => __($status)]);
    }
}