<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Messenger;
use App\Events\MessageSent;
use Illuminate\Support\Facades\Auth;

class MessengerController extends Controller
{
    function send(Request $request){
        $user = Auth::user();
        $message = "$user->name: $request->message";
        $mercury = new Messenger();
        $mercury->message($message);
    }
}
