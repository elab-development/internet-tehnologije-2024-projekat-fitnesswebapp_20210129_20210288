<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{
    use HasFactory;

    /**
     * Polja koja su dozvoljena za masovno dodeljivanje.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'duration',
        'calories_burned',
        'status',
        'user_id'
    ];

    /**
     * Veza sa korisnikom (User).
     *
     * Svaki trening pripada jednom korisniku.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Veza sa vežbama (Exercise).
     *
     * Svaki trening može imati više vežbi.
     */
    public function exercises()
    {
        return $this->hasMany(Exercise::class);
    }
}
