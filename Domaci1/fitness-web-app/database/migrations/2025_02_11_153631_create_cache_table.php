<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migracija za kreiranje tabela 'cache' i 'cache_locks'
return new class extends Migration
{
    /**
     * Pokreće migraciju - kreira tabele 'cache' i 'cache_locks'.
     */
    public function up(): void
    {
        Schema::create('cache', function (Blueprint $table) {
            $table->string('key')->primary(); // Ključ keširanog podatka (primarni ključ)
            $table->mediumText('value'); // Skladištena vrednost keša (srednje dugačak tekst)
            $table->integer('expiration'); // Vreme isteka keširanog podatka
        });

        Schema::create('cache_locks', function (Blueprint $table) {
            $table->string('key')->primary(); // Ključ za zaključavanje (primarni ključ)
            $table->string('owner'); // Identifikator vlasnika zaključavanja
            $table->integer('expiration'); // Vreme isteka zaključavanja
        });
    }

    /**
     * Vraća promene unazad - briše tabele 'cache' i 'cache_locks'.
     */
    public function down(): void
    {
        Schema::dropIfExists('cache'); // Briše tabelu 'cache' ako postoji
        Schema::dropIfExists('cache_locks'); // Briše tabelu 'cache_locks' ako postoji
    }
};
