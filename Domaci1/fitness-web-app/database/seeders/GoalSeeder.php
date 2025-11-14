<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Goal;

// Seeder za kreiranje ciljeva korisnika
class GoalSeeder extends Seeder
{
    public function run()
    {
        Goal::factory(20)->create(); // Kreira 20 random ciljeva
    }
}