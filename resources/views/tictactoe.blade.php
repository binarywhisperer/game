@extends('master.master')

@section('content')
    <div class="game-container" id="game">
        <board :segments="3"
               :gamer="gamer"
               :instance="currentInstance"></board>
        <div class="game-description">
            <general-chat></general-chat>
            <description></description>
        </div>
    </div>
@endsection

@section('javascript')
    <script src="js/tictactoe.js"></script>
@endsection