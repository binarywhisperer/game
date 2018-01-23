<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\Events\MessageSent;
use PhpParser\Node\Expr\Cast\Object_;

class InstanceWin  implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    protected $instance;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($instance, $winner)
    {
        $winner->points = $winner->points + 1000;
        $winner->save();
        $this->message = "# $instance->id | The winner is " . $winner->name . "!";
        $this->instance = $instance;
        $instance->status = "Complete";
        $instance->save();

        $game = new stdClass();
        $game->name = "G.A.M.E.";
        $game->primaryColor = "#fff";
        $game->secondaryColor = "#fff";

        event(new MessageSent($this->message, $game));
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        $channels = [];
        foreach($this->instance->users as $user){
            $channels[] = $user->id;
        }
        return $channels;
    }
}
