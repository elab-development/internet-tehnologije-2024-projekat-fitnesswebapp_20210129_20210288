<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Pokreće migraciju – menja dužinu kolone 'name' na 150 karaktera.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('name', 150) // Smanjujemo maksimalan broj karaktera sa 255 na 150
                  ->change(); // Menjamo kolonu 'name' u tabeli 'users'
        });
    }

    /**
     * Poništava migraciju – vraća dužinu kolone 'name' na 255 karaktera.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('name', 255) // Vraćamo podrazumevanu dužinu (255 karaktera)
                  ->change();
        });
    }
};
