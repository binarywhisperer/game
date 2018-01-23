<?php

use Illuminate\Database\Seeder;
use App\User;
use Faker\Factory as Faker;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userCount = 3;
        $faker = Faker::create();
        for($i = 0; $i < $userCount; $i++){
            $user = new User();
            $user->email = "tester" . $i . "@10wisp.com";
            $user->password = bcrypt('123456');
            $user->points = $faker->numberBetween(0,200);
            $user->primaryColor = $faker->hexcolor;
            $user->secondaryColor = $faker->hexcolor;
            $user->name = substr($faker->userName,-13);
            $user->save();
        }
    }
}
