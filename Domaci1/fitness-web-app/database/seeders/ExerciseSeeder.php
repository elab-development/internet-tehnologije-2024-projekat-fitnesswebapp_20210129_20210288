<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Exercise;

class ExerciseSeeder extends Seeder
{
    public function run()
    {
        Exercise::factory(30)->create(); // Kreira 30 random vežbi
    }
}