<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TicTacToe extends Model
{
    protected $fillable = ['board'];

    function users(){
        return $this->belongsToMany('\App\User', 'tic_tac_toe_user');
    }
}
