<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Exercise;
use App\Models\Workout;

class ExerciseSeeder extends Seeder
{
    public function run()
    {
        $workouts = Workout::all();

        foreach ($workouts as $workout) {
            Exercise::factory(rand(3, 6))->create([
                'workout_id' => $workout->id,
                'type' => fake()->randomElement(['cardio', 'strength', 'flexibility']),
            ]);
        }
    }
}
