<?php

namespace App\Instances;

use App\Instance;
use App\Edges;
use Illuminate\Database\Eloquent\Model;

class Chess extends Instance
{
    protected $table = 'instances';

    function vertices(){
        return [
            'players' => [
                0 => 'X',
                1 => 'O'
            ],
            'locations' => [
                2,3,4,5,6,7,8,9,10
            ]
        ];
    }

    function isPlayerTurn($id){
        return ($this->playerPosition($id) == (count($this->edges()->first()->edges) + 1) % 2);
    }

    function playerPosition($id){
        $position = -1;
        foreach($this->instanceUsers() as $index => $user){
            echo "searched: $id = " . $user->id;
            if($user->id == $id){
                $position = $index;
            }
        }
        return $position;
    }

    function action($action, $edge){

        if(! $this->isPlayerTurn($edge[0])) {
            return "not your turn";
        }
        if(!$this->hasEdge(0,$edge[1]) && !$this->hasEdge(0,$edge[1])){
            $edges = $this->edges()->first();
            $test = json_decode($edges->edges);
            if(count($test) > 0){
                $json = array_unshift($test, $edge);
            }else{
                $json[] = $edge;
            }
            $edges = Edges::find($edges->id);
            $edges->edges = json_encode($json);
            $edges->save();
        }
        $this->checkForVictory();
    }


    function instanceUsers(){
        return Instance::find($this->id)->users();
    }

    function checkForVictory(){

    }
}
