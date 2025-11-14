<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

// Model koji predstavlja korisnika u aplikaciji za fitnes
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',             // Ime korisnika
        'email',            // Email korisnika
        'password',         // Lozinka korisnika (hash)
        'role',             // Uloga (admin, member, guest)
        'fitness_level',    // Nivo fizičke spremnosti
        'email_verified_at',
        'remember_token',   
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Provera uloge korisnika
    public function hasRole($role)
    {
        return $this->role === $role;
    }

    // Dodatne pomoćne metode za uloge
    
    public function isAdmin()
    {
        return $this->role === 'admin';
    }
    public function isMember()
    {
        return $this->role === 'member';
    }
}
