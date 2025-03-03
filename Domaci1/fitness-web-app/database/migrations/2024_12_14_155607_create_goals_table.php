<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Ova klasa predstavlja migraciju za kreiranje tabele 'goals' u bazi podataka
return new class extends Migration
{
    /**
     * Metoda koja se poziva prilikom izvršavanja migracije (kreiranje tabele).
     */
    public function up(): void
    {
        // Kreiranje tabele 'goals'
        Schema::create('goals', function (Blueprint $table) {
            $table->id(); // Automatski generisan primarni ključ (ID)
            $table->string('title'); // Naslov cilja (npr. "Izgubiti 5 kg")
            $table->text('description')->nullable(); // Opis cilja (može biti null)
            $table->unsignedBigInteger('user_id'); // Strani ključ koji povezuje cilj sa korisnikom
            $table->foreign('user_id') // Definisanje stranog ključa
                  ->references('id') // Povezuje se sa kolonom 'id' u tabeli 'users'
                  ->on('users')
                  ->onDelete('cascade'); // Ako se korisnik obriše, obrišu se i svi njegovi ciljevi
            $table->date('target_date')->nullable(); // Datum do kada treba postići cilj (može biti null)
            $table->string('status')->default('pending'); // Status cilja (podrazumevana vrednost je 'pending')
            $table->timestamps(); // Automatski dodaje kolone 'created_at' i 'updated_at'
        });
    }

    /**
     * Metoda koja se poziva prilikom vraćanja migracije (brisanje tabele).
     */
    public function down(): void
    {
        // Brisanje tabele 'goals' ako postoji
        Schema::dropIfExists('goals');
    }
};