<?php

use Illuminate\Database\Seeder;
use App\Instance;
use App\Edges;

class InstancesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i=0; $i<5; $i++){
            $tictactoe = new Instance();
            $tictactoe->schematic_id = 1;
            $tictactoe->status = 'In Progress';
            $tictactoe->save();
            $tictactoe->users()->attach(1);
            $tictactoe->users()->attach(2 + ($i%2));

            $edges = new Edges();
            $edges->instance_id = $tictactoe->id;
            $edges->edges = json_encode([]);
            $edges->save();
        }
    }
}
