<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migracija za dodavanje kolone 'user_id' u tabelu 'workouts' i postavljanje spoljnog ključa
return new class extends Migration
{
    /**
     * Pokreće migraciju – dodaje kolonu 'user_id' u tabelu 'workouts'
     * i postavlja spoljni ključ koji povezuje treninge sa korisnicima.
     */
    public function up(): void
    {
        Schema::table('workouts', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id') // Dodajemo kolonu za povezivanje sa korisnicima
                  ->after('id'); 

            $table->foreign('user_id') // Definišemo spoljni ključ
                  ->references('id') // Povezujemo sa 'id' kolonom u tabeli 'users'
                  ->on('users')
                  ->onDelete('cascade'); // Ako se korisnik obriše, brišu se i njegovi treninzi
        });
    }

    /**
     * Poništava migraciju – uklanja spoljni ključ i briše kolonu 'user_id'.
     */
    public function down(): void
    {
        Schema::table('workouts', function (Blueprint $table) {
            $table->dropForeign(['user_id']); // Prvo uklanjamo spoljni ključ
            $table->dropColumn('user_id'); // Zatim brišemo kolonu
        });
    }
};
