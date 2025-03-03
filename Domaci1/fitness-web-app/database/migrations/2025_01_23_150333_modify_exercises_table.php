<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Pokreće migraciju - menja naziv kolone i briše kolonu.
     */
    public function up(): void
    {
        Schema::table('exercises', function (Blueprint $table) {
            // Preimenujemo kolonu 'duration' u 'reps_or_time'
            $table->renameColumn('duration', 'reps_or_time');

            // Brišemo kolonu 'calories_burned'
            $table->dropColumn('calories_burned');
        });
    }

    /**
     * Vraća promene unazad - vraća originalne nazive i dodaje obrisanu kolonu.
     */
    public function down(): void
    {
        Schema::table('exercises', function (Blueprint $table) {
            // Vraćamo naziv kolone 'reps_or_time' u 'duration'
            $table->renameColumn('reps_or_time', 'duration');

            // Ponovo dodajemo kolonu 'calories_burned', omogućavajući da bude null
            $table->integer('calories_burned')->nullable();
        });
    }
};
