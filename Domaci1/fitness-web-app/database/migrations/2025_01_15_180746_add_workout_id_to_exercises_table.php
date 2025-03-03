<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Primena migracije.
     *
     * Ova metoda dodaje kolonu workout_id u tabelu exercises i definiše strani ključ
     * koji povezuje vežbe sa treningom. Ako se trening obriše, sve povezane vežbe će
     * automatski biti obrisane zbog onDelete('cascade').
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('exercises', function (Blueprint $table) {
            // Dodajemo kolonu workout_id koja će biti tipa unsignedBigInteger
            // i može imati vrednost null (nullable). Ova kolona se dodaje nakon
            // kolone type u tabeli.
            $table->unsignedBigInteger('workout_id')->nullable()->after('type');

            // Definišemo strani ključ workout_id koji referiše na kolonu id
            // u tabeli workouts. Ako se trening obriše, sve povezane vežbe će
            // biti automatski obrisane.
            $table->foreign('workout_id')
                  ->references('id')
                  ->on('workouts')
                  ->onDelete('cascade');
        });
    }

    /**
     * Poništavanje migracije.
     *
     * Ova metoda uklanja kolonu workout_id i strani ključ iz tabele exercises.
     * Ovo se koristi kada želimo da poništimo migraciju i vratimo tabelu u prethodno stanje.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('exercises', function (Blueprint $table) {
            // Uklanjamo strani ključ workout_id iz tabele exercises.
            $table->dropForeign(['workout_id']);

            // Uklanjamo kolonu workout_id iz tabele exercises.
            $table->dropColumn('workout_id');
        });
    }
};