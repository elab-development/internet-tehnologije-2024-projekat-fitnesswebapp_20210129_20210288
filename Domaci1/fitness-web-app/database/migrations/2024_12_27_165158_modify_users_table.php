<?php

// Migracija koja ispravlja neke od prvobitnih ideja

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migracija za modifikaciju tabele 'users' – uklanjanje nepotrebnih kolona
class ModifyUsersTable extends Migration
{
    
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Brisanje kolona koje više nisu potrebne
            $table->dropColumn([
                'email_verified_at',   // Uklanjamo kolonu sa podacima o verifikaciji e-maila
                'remember_token'       // Uklanjamo token koji služi za „zapamti me“ funkcionalnost
            ]);
        });
    }

   
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->timestamp('email_verified_at')->nullable(); // Ponovo dodajemo vreme verifikacije e-maila
            $table->string('remember_token')->nullable(); // Ponovo dodajemo token za „zapamti me“
        });
    }
}
