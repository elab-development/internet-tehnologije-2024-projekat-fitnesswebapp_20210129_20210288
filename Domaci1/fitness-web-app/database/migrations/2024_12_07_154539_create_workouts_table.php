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
        Schema::create('workouts', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Naziv vežbe (npr. Čučnjevi)
            $table->text('description'); // Opis vežbe
            $table->integer('duration'); // Trajanje vežbe u minutima
            $table->integer('calories_burned'); // Broj sagorelih kalorija
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workouts');
    }
};
