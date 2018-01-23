<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Messenger;
use App\Events\MessageSent;
use Illuminate\Support\Facades\Auth;
use App\User;

class MessengerController extends Controller
{
    function send(Request $request){

        $user = User::find($request->gamer);
        $mercury = new Messenger();
        $mercury->message($request->message, $user);
    }
}
