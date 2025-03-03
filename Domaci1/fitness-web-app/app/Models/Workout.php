<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Model za rad sa tabelom "workouts".
 *
 * Ovaj model predstavlja trening korisnika. Svaki trening ima naziv, opis, trajanje,
 * broj sagorenih kalorija, status i vezu sa korisnikom koji ga je kreirao.
 *
 * @property int $id - Jedinstveni identifikator treninga.
 * @property int $user_id - ID korisnika koji je kreirao trening.
 * @property string $name - Naziv treninga.
 * @property string|null $description - Opis treninga (može biti null).
 * @property int $duration - Trajanje treninga u minutima.
 * @property int $calories_burned - Broj sagorenih kalorija tokom treninga.
 * @property string $status - Status treninga (npr. "završen", "u toku").
 * @property \Illuminate\Support\Carbon|null $created_at - Vreme kreiranja treninga.
 * @property \Illuminate\Support\Carbon|null $updated_at - Vreme poslednje izmene treninga.
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Exercise> $exercises - Vežbe povezane sa ovim treningom.
 * @property-read int|null $exercises_count - Broj vežbi povezanih sa ovim treningom.
 * @property-read \App\Models\User $user - Korisnik koji je kreirao trening.
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Workout newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Workout newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Workout query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Workout whereCaloriesBurned($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Workout whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Workout whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Workout whereDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Workout whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Workout whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Workout whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Workout whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Workout whereUserId($value)
 * @mixin \Eloquent
 */
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

    /**
     * Definiše vezu sa modelom User.
     * Jedan trening pripada jednom korisniku.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Definiše vezu sa modelom Exercise.
     * Jedan trening može imati više vežbi.
     */
    public function exercises()
    {
        return $this->hasMany(Exercise::class);
    }
}