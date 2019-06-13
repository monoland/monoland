<?php

use Illuminate\Database\Seeder;
use App\Models\Authent;

class AuthentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Authent::create(['name' => 'administator']);
        // Authent::create(['name' => 'manager']);
        // Authent::create(['name' => 'operator']);
    }
}