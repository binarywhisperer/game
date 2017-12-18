<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Events\MessageSent;

class Messenger extends Model
{
    function message($message){
        event(new MessageSent($message));
    }
}
