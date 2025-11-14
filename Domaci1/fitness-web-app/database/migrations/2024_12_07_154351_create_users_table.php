<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migracija za kreiranje tabele 'users' u bazi podataka
return new class extends Migration
{
    /**
     * Kreira tabelu 'users' u bazi podataka.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Primarni ključ (autoinkrementalni ID)
            $table->string('name'); // Ime korisnika
            $table->string('email')->unique(); // Email (mora biti jedinstven)
            $table->timestamp('email_verified_at')->nullable(); // Datum i vreme kada je email potvrđen (može biti NULL)
            $table->string('password'); // Lozinka korisnika
            $table->rememberToken(); // Token za "Zapamti me" funkcionalnost
            $table->timestamps(); // Kolone 'created_at' i 'updated_at'
        });
    }

    /**
     * Briše tabelu 'users' ako treba da se poništi migracija.
     */
    public function down(): void
    {
        Schema::dropIfExists('users'); // Briše tabelu ako postoji
    }
};
