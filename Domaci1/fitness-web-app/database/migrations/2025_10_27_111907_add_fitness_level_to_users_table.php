<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migracija za dodavanje kolone 'fitness_level' u tabelu 'users'
return new class extends Migration
{
    public function up()
{
    Schema::table('users', function (Blueprint $table) {
        $table->enum('fitness_level', ['beginner', 'intermediate', 'expert'])
              ->default('beginner')
              ->after('role');
    });
}

public function down()
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn('fitness_level');
    });
}

};
