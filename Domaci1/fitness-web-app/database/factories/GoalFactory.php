<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Goal;
use App\Models\User;

// Factory za kreiranje lažnih podataka o ciljevima korisnika
class GoalFactory extends Factory
{
    protected $model = Goal::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'target_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'status' => $this->faker->randomElement(['pending', 'completed']),
        ];
    }
}
