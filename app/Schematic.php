<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Instances\Checkers;
use App\Instances\Chess;
use App\Instances\TicTacToe;

class Schematic extends Model
{
    public function createInstance(){
        if($this->name == 'Tic Tac Toe'){
            return new TicTacToe();
        }elseif($this->name == 'Checkers'){
            return new Checkers();
        }elseif($this->name == 'Chess'){
            return new Chess();
        }
    }

    public function getInstance($instance_id){
        if($this->name == 'Tic Tac Toe'){
            return TicTacToe::find($instance_id);
        }elseif($this->name == 'Checkers'){
            return Checkers::find($instance_id);
        }elseif($this->name == 'Chess'){
            return Chess::find($instance_id);
        }
    }

}
