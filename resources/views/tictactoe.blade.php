@extends('master.master')

@section('content')
    <div class="container" id="game">
        <board :board="board"></board>
    </div>
@endsection

@section('javascript')
    <script src="js/tictactoe.js"></script>
@endsection