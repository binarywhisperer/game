<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use JavaScript;
use App\User;
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
        'edges' => [[0,2]]
    ];


    function home(){
        $user = Auth::user();
        if(!$user){
            return view('login');
        }
        $instances = $user->selects();
        JavaScript::put([
            'instances' => $instances,
            'gamer' => $user,
            'schematics' => Schematic::all(),
            'findingGame' => (count($user->finding()) > 0)
        ]);
        return view('game');
    }
    function editUser(Request $request, User $user){
        $user->email = $request->email;
        $user->name = $request->name;
        $user->primaryColor = $request->primaryColor;
        $user->secondaryColor = $request->secondaryColor;
        $user->save();
        return $user;
    }
    function login(){
        return view('tictactoe');
    }
}
