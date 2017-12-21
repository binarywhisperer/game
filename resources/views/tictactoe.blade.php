@extends('master.master')

@section('content')
    <div class="game-container" id="game">
        <board :segments="3"
                   :users="users"
                   :board="board"></board>
        <div class="game-description">
            <div class="instance-selects">
                <instance-selects
                    :instance="instance"
                    :gamer="gamer"
                    v-for="instance in instances"></instance-selects>
            </div>
            <general-chat></general-chat>
            <description></description>
        </div>
    </div>
@endsection

@section('javascript')
    <script src="js/tictactoe.js"></script>
@endsection