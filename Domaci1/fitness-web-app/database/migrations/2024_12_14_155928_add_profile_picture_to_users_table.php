<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Dodaje kolonu 'profile_picture' u tabelu 'users'.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('profile_picture') // URL ili putanja do profilne slike
                  ->nullable() // Polje nije obavezno, može biti NULL
                  ->after('email'); // Dodaje se posle kolone 'email' radi bolje organizacije
        });
    }

    /**
     * Briše kolonu 'profile_picture' ako se migracija poništava.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('profile_picture'); // Uklanja kolonu iz tabele
        });
    }
};
