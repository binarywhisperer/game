<?php

use Illuminate\Database\Seeder;
use App\Schematic;

class SchematicsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $schematics = ['Tic Tac Toe', 'Checkers', 'Chess'];
        foreach($schematics as $schematic){
            $schem = new Schematic();
            $schem->name = $schematic;
            $schem->minGamers = 2;
            $schem->maxGamers = 2;
            $schem->save();
        }

    }
}
