<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Kreira jednog admina sa poznatim podacima
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@fitnessapp.com',
            'role' => 'admin',
            'fitness_level' => 'expert',
        ]);

        // Kreira 9 običnih članova sa random vrednostima
        User::factory(9)->create([
            'role' => 'member',
            'fitness_level' => fake()->randomElement(['beginner', 'intermediate', 'expert']),
        ]);
    }
}

