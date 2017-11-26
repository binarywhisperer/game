<?php

namespace App\Http\Controllers;

use Auth;
use JavaScript;
use App\TicTacToe;
use Illuminate\Http\Request;

class TicTacToeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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
        'edges' => [
            'constant' => [
                [2,3],[2,5],[2,6],[3,4],[3,6],[4,6],[4,7],[5,6],[5,8],[6,7],[6,8],[6,9],[6,10],[7,10],[8,9],[9,10]
            ],
            'dynamic' => [[1,2],[0,3]]
        ]
    ];
    public function index()
    {
        $user = Auth::user();
        $myGames = $user->tictactoes()->get();
        $availableGames = TicTacToe::withCount('users')->having('users_count','<',2)->get();

        JavaScript::put([
            'board' => $this->board,
            'myGames' => $myGames,
            'availableGames' => $availableGames,
            'users' => [$user,['name'=> "A.I."]],
            'gamer' => $user,
        ]);
        return view('tictactoe');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $user = Auth::user();
        $tictactoe = TicTacToe::create([
            'board' => '[]'
        ]);
        $tictactoe->users()->attach($user->id);
        $tictactoe->users = $tictactoe->users()->get();
        return $tictactoe;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }



    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function join(TicTacToe $tictactoe)
    {
        $user = Auth::user();
        $tictactoe->users()->attach($user->id);
        $tictactoe->users = $tictactoe->users()->get();
        return $tictactoe;
    }


    public function json(TicTacToe $tictactoe)
    {
        $tictactoe->users = $tictactoe->users()->get();
        return $tictactoe;
    }
}