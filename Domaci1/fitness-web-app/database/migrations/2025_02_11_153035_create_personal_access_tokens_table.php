<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migracija za kreiranje tabele 'personal_access_tokens'
return new class extends Migration
{
    /**
     * Pokreće migraciju - kreira tabelu 'personal_access_tokens'.
     */
    public function up(): void
    {
        Schema::create('personal_access_tokens', function (Blueprint $table) {
            $table->id(); // Primarni ključ (auto-increment ID)
            $table->morphs('tokenable'); // Polimorfna relacija (omogućava vezu sa različitim modelima)
            $table->string('name'); // Naziv tokena
            $table->string('token', 64)->unique(); // Unikatan token, maksimalne dužine 64 karaktera
            $table->text('abilities')->nullable(); // Lista dozvoljenih akcija za token (JSON format, može biti null)
            $table->timestamp('last_used_at')->nullable(); // Datum i vreme poslednje upotrebe tokena
            $table->timestamp('expires_at')->nullable(); // Datum i vreme isteka tokena (može biti null)
            $table->timestamps(); // Automatski dodaje 'created_at' i 'updated_at'
        });
    }

    /**
     * Vraća promene unazad - briše tabelu 'personal_access_tokens'.
     */
    public function down(): void
    {
        Schema::dropIfExists('personal_access_tokens'); // Briše tabelu ako postoji
    }
};
