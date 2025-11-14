<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

// Seeder za popunjavanje baze podataka početnim podacima
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class, // Poziva UserSeeder za kreiranje korisnika
            WorkoutSeeder::class, // Poziva WorkoutSeeder za kreiranje treninga
            ExerciseSeeder::class, // Poziva ExerciseSeeder za kreiranje vežbi
            GoalSeeder::class, // Poziva GoalSeeder za kreiranje ciljeva korisnika
        ]);
    }
}
