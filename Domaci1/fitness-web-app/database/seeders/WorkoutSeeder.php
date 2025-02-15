<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Workout;

class WorkoutSeeder extends Seeder
{
    public function run()
    {
        Workout::factory(20)->create(); // Kreira 20 treninga
    }
}
