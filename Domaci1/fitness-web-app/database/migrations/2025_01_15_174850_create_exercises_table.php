<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migracija za kreiranje tabele 'exercises'
return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('exercises', function (Blueprint $table) {
            // Automatski generisani primarni ključ
            $table->id();

            // Naziv vežbe (tipa string)
            $table->string('name');

            // Opis vežbe (tipa text, može biti NULL)
            $table->text('description')->nullable();

            // Trajanje vežbe u minutima (tipa integer)
            $table->integer('duration');

            // Broj sagorenih kalorija (tipa integer, može biti NULL)
            $table->integer('calories_burned')->nullable();

            // Automatski generisane kolone `created_at` i `updated_at` za praćenje vremena kreiranja i ažuriranja
            $table->timestamps();
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('exercises');
    }
};