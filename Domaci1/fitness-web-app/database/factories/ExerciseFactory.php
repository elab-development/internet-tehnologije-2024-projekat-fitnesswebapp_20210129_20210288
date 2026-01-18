<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Exercise;
use App\Models\Workout;

// Factory za kreiranje lažnih podataka o vežbama
class ExerciseFactory extends Factory
{
    protected $model = Exercise::class;

    public function definition()
    {
        return [
            'workout_id' => Workout::factory(),
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'reps_or_time' => $this->faker->numberBetween(5, 60),
            'type' => $this->faker->randomElement(['cardio', 'strength', 'flexibility']),
        ];
    }
}
