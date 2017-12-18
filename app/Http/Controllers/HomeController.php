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

        JavaScript::put([
            'board' => $this->board,
            'users' => [$user,['name'=> "A.I."]],
            'gamer' => $user,
            'schematics' => Schematic::all()
        ]);
        return view('tictactoe');
    }
}
