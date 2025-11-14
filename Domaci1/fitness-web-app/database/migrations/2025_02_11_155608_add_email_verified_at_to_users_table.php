<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migracija za dodavanje kolone 'email_verified_at' u tabelu 'users'
return new class extends Migration {
    /**
     * Pokreće migraciju - dodaje kolonu 'email_verified_at' u tabelu 'users'.
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Dodaje timestamp kolonu koja može biti null
            // Ova kolona se koristi za evidentiranje kada je email korisnika potvrđen
            $table->timestamp('email_verified_at')->nullable();
        });
    }
    
    /**
     * Vraća migraciju nazad - uklanja kolonu 'email_verified_at'.
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Uklanja kolonu u slučaju rollback-a
            $table->dropColumn('email_verified_at');
        });
    }
};
