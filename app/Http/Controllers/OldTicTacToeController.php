<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JavaScript;

class OldTicTacToeController extends Controller
{
    //
    function index(){
        $board = [
            'vertices' => [
                'players' => [
                    0 => 'X',
                    1 => 'O'
                ],
                'locations' => [
                    2,3,4,5,6,7,8,9,10
                ]
            ],
            'edges' => [
                'constant' => [
                    [2,3],[2,5],[2,6],[3,4],[3,6],[4,6],[4,7],[5,6],[5,8],[6,7],[6,8],[6,9],[6,10],[7,10],[8,9],[9,10]
                ],
                'dynamic' => []
            ]
        ];

        JavaScript::put([
            'board' => $board
        ]);
        return view('tictactoe');
    }
}
