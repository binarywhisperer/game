<?php

namespace App\Instances;


use App\Events\InstanceJoined;
use App\Events\InstanceUpdated;
use App\Events\InstanceWin;
use App\Instance;
use App\Edges;
use Illuminate\Database\Eloquent\Model;

class Checkers extends Instance
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

    function users(){
        return $this->belongsToMany('\App\User','instance_user','instance_id', 'user_id')->select(['users.id','users.name','users.primaryColor','users.secondaryColor']);
    }

    function generate($request, $user){
        $tictactoe = new TicTacToe();
        $tictactoe->schematic_id = $request->schematic;
        $tictactoe->status = 'Starting';
        $tictactoe->save();
        $tictactoe->users()->attach($user->id);

        $edges = new Edges();
        $edges->instance_id = $tictactoe->id;
        $edgeJSON = [];
        $edgeJSON[] = [0,1];
        $edgeJSON[] = [0,3];
        $edgeJSON[] = [0,5];
        $edgeJSON[] = [0,7];
        $edgeJSON[] = [0,9];
        $edgeJSON[] = [0,10];
        $edgeJSON[] = [0,12];
        $edgeJSON[] = [0,14];
        $edgeJSON[] = [0,16];
        $edgeJSON[] = [0,19];
        $edgeJSON[] = [0,21];
        $edgeJSON[] = [0,23];
        $edgeJSON[] = [0,25];

        $edgeJSON[] = [1,42];
        $edgeJSON[] = [1,44];
        $edgeJSON[] = [1,46];
        $edgeJSON[] = [1,48];
        $edgeJSON[] = [1,51];
        $edgeJSON[] = [1,53];
        $edgeJSON[] = [1,55];
        $edgeJSON[] = [1,57];
        $edgeJSON[] = [1,58];
        $edgeJSON[] = [1,60];
        $edgeJSON[] = [1,62];
        $edgeJSON[] = [1,64];

        $edges->edges = json_encode($edgeJSON);
        $edges->save();
    }

    function turn($request){
        return $this->action($request->action, $request->edge);
    }
    function hasUser($id){
        foreach($this->users as $user){
            if($user->id === $id){
                return true;
            }
        }
        return false;
    }

    function hasEdge($v1,$v2){
        foreach(json_decode($this->edges->first()->edges) as $edge){
            if(($edge[0] == $v1 && $edge[1] == $v2) || ($edge[1] == $v1 && $edge[0] == $v2)){
                return true;
            }
        }
        return false;
    }

    function addUser($addUser){
        if(!$this->hasUser($addUser->id)){
            $this->users()->attach($addUser->id);
            event(new InstanceJoined($this,$addUser->id ));
            return true;
        }
        return false;
    }


    function checkForVictory(){
        $winner = -1;
        foreach([0,1] as $user){
            foreach([3,5,6,7,9] as $possible){

                if($this->hasEdge($user, $possible - 1) && $this->hasEdge($user, $possible) && $this->hasEdge($user, $possible + 1)){
                    //Horizontal
                    $winner = $this->users[$user];
                }elseif($this->hasEdge($user, $possible - 3) && $this->hasEdge($user, $possible) && $this->hasEdge($user, $possible + 3)){
                    //Vertical
                    $winner = $this->users[$user];
                }elseif(($this->hasEdge($user, 2) && $this->hasEdge($user, 6) && $this->hasEdge($user, 10)) || ($this->hasEdge($user, 4) && $this->hasEdge($user, 6) && $this->hasEdge($user, 8))){
                    //Diagonal
                    $winner = $this->users[$user];
                }
            }
        }
        if($winner !== -1){
            event(new InstanceWin($this, $winner));
        }
    }


    function isPlayerTurn($playerPosition){
        return ($playerPosition == (count(json_decode($this->edges()->first()->edges))) % 2);
    }

    function playerPosition($id){
        $position = -1;
        foreach($this->users()->get() as $index => $user){
            if($user->id == $id){
                $position = $index;
            }
        }
        return $position;
    }

    function action($action, $edge){
        $playerPosition = $this->playerPosition($edge[0]);
        if(! $this->isPlayerTurn($playerPosition)) {
            return "not your turn";
        }
        if(!$this->hasEdge(0,$edge[1]) && !$this->hasEdge(0,$edge[1])){
            $edges = $this->edges()->first();
            $edgesArray = json_decode($edges->edges);
            if(count($edgesArray) > 0){
                $json[] = [$playerPosition, $edge[1]];
                foreach($edgesArray as $e){
                    $json[] = $e;
                }
            }else{
                $json[] =  [$playerPosition, $edge[1]];
            }
            $edges = Edges::find($edges->id);
            $edges->edges = json_encode($json);
            $edges->save();
            event(new InstanceUpdated($this, $edges));
        }
        $this->checkForVictory();
    }
}

