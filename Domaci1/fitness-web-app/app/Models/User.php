<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',      // Ime korisnika
        'email',     // Email korisnika
        'password',  // Lozinka korisnika
        'role',      // Uloga korisnika (admin, član)
    ];

    // Atributi koji će biti sakriveni prilikom serijalizacije modela
    protected $hidden = [
        'password',        // Lozinka korisnika
        'remember_token',  // Token za pamćenje korisnika
    ];

    // Polja koja se automatski kastuju u odgovarajući tip
    protected $casts = [
        'email_verified_at' => 'datetime', // Polje za verifikaciju emaila se konvertuje u datetime
        'password' => 'hashed',            // Lozinka se tretira kao hash
    ];

    // Definiše vezu sa modelom Workout
    public function hasRole($role)
    {
        return $this->role === $role;
    }

    /**
     * Proverava da li je korisnik administrator
     */
    public function isAdmin()
    {
        return $this->role === 'admin';  // Vraća true ako je korisnik admin
    }

    /**
     * Proverava da li je korisnik član
     */
    public function isMember()
    {
        return $this->role === 'member';  // Vraća true ako je korisnik član
    }
}
