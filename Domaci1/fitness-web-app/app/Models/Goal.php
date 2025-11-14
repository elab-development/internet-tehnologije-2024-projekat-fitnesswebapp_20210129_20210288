<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Model koji predstavlja cilj u aplikaciji za fitnes
class Goal extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', // Naslov cilja
        'description', // Opis cilja
        'user_id', // ID korisnika kojem cilj pripada
        'status', // Status cilja
        'target_date', // Ciljani datum za postizanje cilja
    ];

    protected $casts = [
        'target_date' => 'date:Y-m-d', // Formatiranje datuma
    ];
}
