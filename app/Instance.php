<?php

namespace App;

use App\Events\InstanceJoined;
use App\Events\InstanceUpdated;
use App\Events\MessageSent;
use Illuminate\Database\Eloquent\Model;

class Instance extends Model
{
    function schematic(){
        return $this->hasOne('\App\Schematic','id','schematic_id');
    }

    function users(){
        return $this->belongsToMany('\App\User','instance_user')->select(['users.id','users.name','users.primaryColor','users.secondaryColor']);
    }

    function vertices(){
        return $this->hasMany('\App\Vertices','instance_id');
    }

    function edges(){
        return $this->hasMany('\App\Edges','instance_id');
    }

    function board(){

    }

    function hasUser($id){
        foreach($this->users() as $user){
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
            event(new InstanceJoined($this, $addUser));
            return true;
        }
        return false;
    }


    function checkForVictory(){

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
