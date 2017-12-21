<?php

namespace App;

use App\Events\InstanceJoined;
use App\Events\MessageSent;
use Illuminate\Database\Eloquent\Model;

class Instance extends Model
{
    function schematic(){
        return $this->hasOne('\App\Schematic','id','schematic_id');
    }

    function users(){
        return $this->belongsToMany('\App\User','instance_user');
    }

    function vertices(){
        return $this->hasMany('\App\Vertices','instance_id');
    }

    function edges(){
        return $this->hasMany('\App\Edges','instance_id');
    }



    function hasUser($id){
        foreach($this->users() as $user){
            if($user->id === $id){
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
}
