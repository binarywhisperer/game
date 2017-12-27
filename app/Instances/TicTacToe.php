<?php

namespace App\Instances;

use App\Instance;
use Illuminate\Database\Eloquent\Model;

class TicTacToe extends Instance
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
}
