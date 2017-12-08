@extends('master.master')

@section('content')
    <div class="game-container" id="game">
        <div class="game-board">
        <board :users="users"
               :board="board"></board>
        </div>
        <div class="game-selector">
            <my-game   :id = game.id
                       :board = game.board
                       :users_count = game.users_count
                       v-for="game in myGames" :key="game.id"></my-game>
        </div>
    </div>

@endsection

@section('javascript')
    <script src="js/tictactoe.js"></script>
@endsection