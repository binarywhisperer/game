@extends('master.master')

@section('content')
    <div class="game-container" id="game" onClick="document.getElementById('nav').className = 'animated bounceOutUp'">
        <tictactoe-board v-if="currentInstance.schematic == 1"
                         :segments="3"
                         :gamer="gamer"
                         :instance="currentInstance"></tictactoe-board>
        <checkers-board  v-if="currentInstance.schematic == 2"
                         :segments="8"
                         :gamer="gamer"
                         :instance="currentInstance"></checkers-board>
        <chess-board  v-if="currentInstance.schematic == 3"
                         :segments="8"
                         :gamer="gamer"
                         :instance="currentInstance"></chess-board>

        <div class="game-description">
            <general-chat :gamer="gamer"></general-chat>
            <tictactoe-description v-if="currentInstance.schematic == 1"></tictactoe-description>
            <checkers-description v-if="currentInstance.schematic == 2"></checkers-description>
            <chess-description v-if="currentInstance.schematic == 3"></chess-description>
        </div>
    </div>
@endsection

@section('javascript')
    <script src="js/game.js"></script>
@endsection