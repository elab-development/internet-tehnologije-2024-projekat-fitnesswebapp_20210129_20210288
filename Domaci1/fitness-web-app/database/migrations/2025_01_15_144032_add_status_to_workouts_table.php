<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migracija za dodavanje kolone 'status' u tabelu 'workouts'
class AddStatusToWorkoutsTable extends Migration
{
    
    public function up()
    {
        Schema::table('workouts', function (Blueprint $table) {
            // Dodajemo kolonu `status` tipa string sa podrazumevanom vrednošću 'pending'
            // Ova kolona će biti postavljena nakon kolone `calories_burned`
            $table->string('status')->default('pending')->after('calories_burned');
        });
    }

    
    public function down()
    {
        Schema::table('workouts', function (Blueprint $table) {
            // Uklanjamo kolonu `status` iz tabele
            $table->dropColumn('status');
        });
    }
}