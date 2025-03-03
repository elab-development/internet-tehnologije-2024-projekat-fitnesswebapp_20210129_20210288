<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Pokreće migraciju - kreira tabelu 'sessions'.
     */
    public function up(): void
    {
        Schema::create('sessions', function (Blueprint $table) {
            // Primarni ključ - string ID sesije
            $table->string('id')->primary();
            
            // ID korisnika - može biti null ako korisnik nije ulogovan
            $table->foreignId('user_id')->nullable()->index();
            
            // IP adresa korisnika - može biti null
            $table->string('ip_address', 45)->nullable();
            
            // Informacije o korisnikovom pretraživaču (user agent) - može biti null
            $table->text('user_agent')->nullable();
            
            // Podaci o sesiji, čuvani u JSON formatu
            $table->longText('payload');
            
            // Vreme poslednje aktivnosti - indeksirano radi brže pretrage
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Vraća migraciju nazad - briše tabelu 'sessions'.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};
