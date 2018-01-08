<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Messenger;
use App\Events\MessageSent;
use Illuminate\Support\Facades\Auth;
use App\Message;

class MessengerController extends Controller
{
    function send(Request $request){
        $user = Auth::user();
        $mercury = new Messenger();
        $mercury->message($request->message, $user);
    }
}
