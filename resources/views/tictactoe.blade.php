@extends('master.master')

@section('content')
    <div class="game-container" id="game">
        <board :segments="3"
                   :users="users"
                   :board="board"></board>
        <div class="game-selector">
            <general-chat></general-chat>
        </div>
    </div>

@endsection

@section('javascript')
    <script src="js/tictactoe.js"></script>
@endsection