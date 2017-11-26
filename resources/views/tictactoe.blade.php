@extends('master.master')

@section('content')
    <div class="game-container" id="game">
        <div class="game-board">
        <board :users="users"
               :board="board"></board>
        <div class="game-selector">
            <my-game   :id = game.id
                       :board = game.board
                    :users_count = game.users_count
                    v-for="game in myGames" :key="game.id"></my-game>
            <div class="field">
                <p class="control">
                    <button @click="createGame" class="button is-success">
                        Create Game
                    </button>
                </p>
            </div>
            <join-game   :id = game.id
                    :users_count = game.users_count
                    v-for="game in availableGames" :key="game.id"></join-game>
        </div>
        </div>
    </div>

@endsection

@section('javascript')
    <script src="js/tictactoe.js"></script>
@endsection