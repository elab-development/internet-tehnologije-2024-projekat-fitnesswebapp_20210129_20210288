<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migracija za kreiranje tabele 'workouts'
return new class extends Migration
{
    /**
     * Metoda koja se poziva prilikom izvršavanja migracije (kreiranje tabele).
     */
    public function up(): void
    {
        // Kreiranje tabele 'workouts'
        Schema::create('workouts', function (Blueprint $table) {
            $table->id(); // Automatski generisan primarni ključ (ID)
            $table->string('name'); // Naziv vežbe (npr. "Čučnjevi")
            $table->text('description'); // Detaljan opis vežbe
            $table->integer('duration'); // Trajanje vežbe u minutima
            $table->integer('calories_burned')->nullable(); // Broj sagorelih kalorija (može biti null)
            $table->timestamps(); // Automatski dodaje kolone 'created_at' i 'updated_at'
        });
    }

    /**
     * Metoda koja se poziva prilikom vraćanja migracije (brisanje tabele).
     */
    public function down(): void
    {
        // Brisanje tabele 'workouts' ako postoji
        Schema::dropIfExists('workouts');
    }
};
