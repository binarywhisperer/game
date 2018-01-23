<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token','created_at','updated_at',
    ];

    function instances(){
        return $this->belongsToMany('\App\Instance','instance_user')->where('status','In Progress');
    }

    function finding(){
        return $this->instances()->where([['status','Starting']])->get();
    }
    function selects(){
        return $this->instances->map(function($instance){
            $data['id'] = $instance->id;
            $data['updated_at'] =  $instance->updated_at;
            $data['schematic'] = $instance->schematic->id;
            $data['edges'] = $instance->edges()->first()->edges;
            $data['users'] = $instance->users;
            return $data;
        });
    }
}
