<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


// Model koji predstavlja trening u aplikaciji za fitnes
class Workout extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',          // Naziv treninga
        'description',   // Opis treninga
        'duration',     // Trajanje treninga u minutima
        'calories_burned', // Broj sagorenih kalorija
        'status',        // Status treninga
        'user_id'       // ID korisnika koji je kreirao trening
    ];

    // Definiše vezu sa modelom User.
    // Jedan trening pripada jednom korisniku.
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Definiše vezu sa modelom Exercise.
    // Jedan trening može imati više vežbi.
    public function exercises()
    {
        return $this->hasMany(Exercise::class);
    }
}
