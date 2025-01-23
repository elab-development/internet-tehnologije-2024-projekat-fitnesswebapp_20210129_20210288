<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('exercises', function (Blueprint $table) {
            // Preimenujemo kolonu duration u rep/time
            $table->renameColumn('duration', 'reps_or_time');

            // Brišemo kolonu calories_burned
            $table->dropColumn('calories_burned');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exercises', function (Blueprint $table) {
            // Vraćamo kolonu duration
            $table->renameColumn('reps_or_time', 'duration');

            // Dodajemo kolonu calories_burned nazad
            $table->integer('calories_burned')->nullable();
        });
    }
};
