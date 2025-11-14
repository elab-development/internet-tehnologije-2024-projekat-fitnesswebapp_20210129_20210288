<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migracija za modifikaciju kolone 'description' u tabeli 'workouts' – dozvoljava NULL vrednosti
class ModifyDescriptionNullableInWorkoutsTable extends Migration
{
    
    public function up(): void
    {
        Schema::table('workouts', function (Blueprint $table) {
            // Menjamo kolonu `description` da bude tipa `text` i dozvoljavamo joj da ima `NULL` vrednost
            $table->text('description')->nullable()->change();
        });
    }

    
    public function down(): void
    {
        Schema::table('workouts', function (Blueprint $table) {
            // Vraćamo kolonu `description` u stanje gde ne može biti `nullable`
            $table->text('description')->nullable(false)->change();
        });
    }
}