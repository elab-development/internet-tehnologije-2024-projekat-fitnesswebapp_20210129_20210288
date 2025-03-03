<?php

// Migracija koja ispravlja neke od prvobitnih ideja

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyUsersTable extends Migration
{
    /**
     * Pokreće migraciju – uklanja određene kolone iz tabele 'users'.
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Brisanje kolona koje više nisu potrebne
            $table->dropColumn([
                'profile_picture',     // Uklanjamo kolonu sa putanjom do profilne slike
                'email_verified_at',   // Uklanjamo kolonu sa podacima o verifikaciji e-maila
                'remember_token'       // Uklanjamo token koji služi za „zapamti me“ funkcionalnost
            ]);
        });
    }

    /**
     * Poništava migraciju – ponovo dodaje obrisane kolone.
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Vraćamo prethodno obrisane kolone u slučaju rollback-a
            $table->string('profile_picture')->nullable(); // Ponovo dodajemo kolonu za profilnu sliku
            $table->timestamp('email_verified_at')->nullable(); // Ponovo dodajemo vreme verifikacije e-maila
            $table->string('remember_token')->nullable(); // Ponovo dodajemo token za „zapamti me“
        });
    }
}
