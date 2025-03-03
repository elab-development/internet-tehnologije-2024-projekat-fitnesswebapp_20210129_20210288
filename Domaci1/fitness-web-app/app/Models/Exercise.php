<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Model za vežbe.
 * 
 * @property int $id               Jedinstveni ID vežbe
 * @property string $name           Naziv vežbe
 * @property string|null $description Opis vežbe
 * @property int $reps_or_time      Broj ponavljanja ili vreme trajanja vežbe
 * @property \Illuminate\Support\Carbon|null $created_at Datum kada je vežba kreirana
 * @property \Illuminate\Support\Carbon|null $updated_at Datum kada je vežba poslednji put ažurirana
 * @property string|null $type      Tip vežbe (npr. snaga, kardio itd.)
 * @property int|null $workout_id   ID treninga kojem vežba pripada
 * @property-read \App\Models\Workout|null $workout Trening kojem vežba pripada
 * 
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise newModelQuery() Kreira novi upit za model
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise newQuery() Kreira novi upit za model
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise query() Pokreće upit za model
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise whereCreatedAt($value) Filtrira po datumu kreiranja
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise whereDescription($value) Filtrira po opisu
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise whereId($value) Filtrira po ID-u
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise whereName($value) Filtrira po imenu
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise whereRepsOrTime($value) Filtrira po broju ponavljanja ili vremenu
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise whereType($value) Filtrira po tipu
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise whereUpdatedAt($value) Filtrira po datumu ažuriranja
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Exercise whereWorkoutId($value) Filtrira po ID-u treninga
 * 
 * @mixin \Eloquent
 */
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

