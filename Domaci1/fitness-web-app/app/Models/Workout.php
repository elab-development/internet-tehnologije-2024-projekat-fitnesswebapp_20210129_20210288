<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string|null $description
 * @property int $duration
 * @property int $calories_burned
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Exercise> $exercises
 * @property-read int|null $exercises_count
 * @property-read \App\Models\User $user
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
