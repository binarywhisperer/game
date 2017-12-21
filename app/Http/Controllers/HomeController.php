<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use JavaScript;
use App\Schematic;

class HomeController extends Controller
{

    protected $board = [
        'vertices' => [
            'players' => [
                0 => 'X',
                1 => 'O'
            ],
            'locations' => [
                2,3,4,5,6,7,8,9,10
            ]
        ],
        'edges' => []
    ];


    function home(){
        $user = Auth::user();
        if($user){
            $instances = $user->selects();
            JavaScript::put([
                'board' => $this->board,
                'instances' => $instances,
                'users' => [$user,['name'=> "A.I."]],
                'gamer' => $user,
                'schematics' => Schematic::all()
            ]);
        }else{

        }
        return view('tictactoe');
    }

    function login(){

        return view('tictactoe');
    }
}
