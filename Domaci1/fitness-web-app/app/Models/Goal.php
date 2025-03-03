<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Model za ciljeve korisnika.
 * 
 * @property int $id           Jedinstveni ID cilja
 * @property string $title     Naslov cilja
 * @property string|null $description Opis cilja
 * @property int $user_id      ID korisnika koji je postavio cilj
 * @property \Illuminate\Support\Carbon|null $created_at Datum kada je cilj kreiran
 * @property \Illuminate\Support\Carbon|null $updated_at Datum kada je cilj poslednji put ažuriran
 * 
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Goal newModelQuery() Kreira novi upit za model
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Goal newQuery() Kreira novi upit za model
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Goal query() Pokreće upit za model
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Goal whereCreatedAt($value) Filtrira po datumu kreiranja
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Goal whereDescription($value) Filtrira po opisu
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Goal whereId($value) Filtrira po ID-u
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Goal whereTitle($value) Filtrira po naslovu
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Goal whereUpdatedAt($value) Filtrira po datumu ažuriranja
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Goal whereUserId($value) Filtrira po ID-u korisnika
 * 
 * @mixin \Eloquent
 */
class Goal extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',       // Naslov cilja
        'description', // Opis cilja
        'user_id',     // ID korisnika koji je postavio cilj
    ];
}
