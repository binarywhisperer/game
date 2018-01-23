<?php

use Illuminate\Support\Facades\Redis;
use App\Events\MessageSent;

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

Route::get('/', 'HomeController@home');

