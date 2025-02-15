<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Workout;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Workout>
 */
class WorkoutFactory extends Factory
{
    protected $model = Workout::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'duration' => $this->faker->numberBetween(10, 120),
            'user_id' => 1,
            'calories_burned' => $this->faker->numberBetween(50, 500),
        ];
    }
}
