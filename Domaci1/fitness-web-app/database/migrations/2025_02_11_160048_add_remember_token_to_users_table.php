<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migracija za dodavanje kolone 'email_verified_at' u tabelu 'users'
return new class extends Migration {
    /**
     * Pokreće migraciju - dodaje kolonu 'remember_token' u tabelu 'users'.
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Dodaje 'remember_token' kolonu za autentifikaciju "zapamti me" funkcionalnosti
            $table->rememberToken();
        });
    }

    /**
     * Vraća migraciju nazad - uklanja kolonu 'remember_token'.
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Briše 'remember_token' kolonu u slučaju rollback-a
            $table->dropColumn('remember_token');
        });
    }
};
