<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Exercise;
use App\Models\Workout;

class ExerciseFactory extends Factory
{
    protected $model = Exercise::class;

    public function definition()
    {
        return [
            'workout_id' => Workout::factory(), // Povezuje sa random Workout
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'reps_or_time' => $this->faker->numberBetween(5, 60), // Zamenjeno sa reps_or_time
            'type' => $this->faker->randomElement(['cardio', 'strength', 'flexibility']),
        ];
    }
}