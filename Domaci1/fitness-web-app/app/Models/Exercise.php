<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Model koji predstavlja vežbu u aplikaciji za fitnes
class Exercise extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',         // Ime vežbe
        'description',  // Opis vežbe
        'reps_or_time', // Broj ponavljanja ili vreme
        'type',         // Tip vežbe
        'workout_id',   // ID treninga kojem vežba pripada
    ];

    /**
     * Definiše vezu sa modelom Workout.
     * Jedna vežba pripada jednom treningu.
     */
    public function workout()
    {
        return $this->belongsTo(Workout::class); // Veza sa modelom Workout
    }
}

