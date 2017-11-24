<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/logout',function(){
    Auth::logout();
    return redirect('/');
});


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/tictactoe','TicTacToeController@index');

Route::get('/tictactoe/{tictactoe}', 'TicTacToeController@show');
Route::post('/tictactoe/{tictactoe}', 'TicTacToeController@update');
Route::post('/tictactoe/{tictactoe}/join', 'TicTacToeController@join');
Route::get('/tictactoe/{tictactoe}/json', 'TicTacToeController@json');
Route::put('/tictactoe', 'TicTacToeController@create');