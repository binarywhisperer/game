<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/messenger', 'MessengerController@send');

Route::post('/user/{user}', 'HomeController@editUser');

Route::get('/{userid}/instances', 'InstanceController@selects');

Route::post('/instance', 'InstanceController@join');
Route::post('/instance/{instance}', 'InstanceController@turn');

