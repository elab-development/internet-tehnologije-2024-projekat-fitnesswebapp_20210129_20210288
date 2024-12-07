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
        Schema::create('progress', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // ID korisnika
            $table->unsignedBigInteger('workout_id'); // ID vežbe
            $table->integer('reps'); // Broj ponavljanja
            $table->integer('sets'); // Broj serija
            $table->timestamps();

            // Definiši spoljne ključeve za povezivanje sa `users` i `workouts` tabelama
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('workout_id')->references('id')->on('workouts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('progress');
    }
};
