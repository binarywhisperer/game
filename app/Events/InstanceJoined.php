<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Support\Facades\Event;
use App\User;

class InstanceJoined implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $instance;
    public $message;
    public $edges;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($instance,$user_id)
    {
        $user = User::find($user_id);
        $this->instance = $instance;
        $this->edges = $instance->edges;
        $this->message = "NEW GAME! #" . $instance->id . PHP_EOL . $user->name . " vs " . $instance->users->last()->name;
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
