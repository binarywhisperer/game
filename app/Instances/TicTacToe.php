<?php

namespace App\Instances;

use App\Instance;
use Illuminate\Database\Eloquent\Model;

class TicTacToe extends Instance
{
    protected $table = 'instances';

    function vertices(){
        return "Tic Tac Toe does not need Vertices.";
    }


}
