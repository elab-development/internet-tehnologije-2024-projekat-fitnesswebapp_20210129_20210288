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
        'name',             // Ime korisnika
        'email',            // Email korisnika
        'password',         // Lozinka korisnika (hash)
        'role',             // Uloga (admin, member, guest)
        'fitness_level',    // Nivo fizičke spremnosti
        'email_verified_at',// ⬅ dozvoli popunjavanje prilikom registracije
        'remember_token',   // ⬅ dozvoli generisanje tokena
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function hasRole($role)
    {
        return $this->role === $role;
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isMember()
    {
        return $this->role === 'member';
    }
}
