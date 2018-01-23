<?php

namespace App;

use App\Events\InstanceJoined;
use App\Events\InstanceWin;
use App\Events\InstanceUpdated;
use App\Events\MessageSent;
use Illuminate\Database\Eloquent\Model;

class Instance extends Model
{
    function generate($request, $user){

    }

    function turn($request){

    }

    function getConcrete(){
        $schematic = Schematic::find($this->schematic_id);
        return $schematic->getInstance($this->id);
    }
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
}
