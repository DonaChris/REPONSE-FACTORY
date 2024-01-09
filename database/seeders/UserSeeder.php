<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Creation de l'admin N°1
        $newUser = new User([
            "name" => "Boss 1",
            "email" => "admin@admin.com",
            "email_verified_at" => now(),
            "password" => Hash::make("123456"),
            "two_factor_secret" => "-",
            "two_factor_recovery_codes" => "-",
            "remember_token" => "",
            "created_at" => now(),
            "updated_at" => now(),
        ]);

        $newUser->save();
    }
}
