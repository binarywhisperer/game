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


class InstanceJoined implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $instance;
    public $message;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($instance)
    {
        $this->instance = $instance;
        $this->message = "NEW GAME! #" . $instance->id;// . $instance->users[0]->name . " vs " . $instance->users[1]->name;
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
