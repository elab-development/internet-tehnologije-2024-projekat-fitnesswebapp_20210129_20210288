<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Brisanje nepotrebnih kolona
            $table->dropColumn(['profile_picture', 'email_verified_at', 'remember_token']);
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Vraćanje obrisanih kolona
            $table->string('profile_picture')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('remember_token')->nullable();
        });
    }
}
