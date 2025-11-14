<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migracija za dodavanje kolone 'type' u tabelu 'exercises'
return new class extends Migration
{
    
    public function up(): void
    {
        Schema::table('exercises', function (Blueprint $table) {
            $table->string('type')->nullable(); // Dodaje kolonu 'type' koja može biti null
        });
    }

    
    public function down(): void
    {
        Schema::table('exercises', function (Blueprint $table) {
            $table->dropColumn('type'); 
        });
    }
};
