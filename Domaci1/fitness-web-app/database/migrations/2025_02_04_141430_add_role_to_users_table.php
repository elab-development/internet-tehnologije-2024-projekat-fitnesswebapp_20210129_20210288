<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migracija za dodavanje kolone 'role' u tabelu 'users'
class AddRoleToUsersTable extends Migration
{
    /**
     * Pokreće migraciju - dodaje kolonu 'role' sa podrazumevanom vrednošću 'member'.
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('member'); // Dodajemo kolonu 'role' sa default vrednošću 'member'
        });
    }

    /**
     * Vraća promene unazad - briše kolonu 'role'.
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role'); // Uklanjamo kolonu 'role' prilikom rollback-a migracije
        });
    }
}
