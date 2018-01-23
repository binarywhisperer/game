<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

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
        $this->message = "The winner is " . $winner->name . "!";
        $this->instance = $instance;
        $instance->status = "Complete";
        $instance->save();
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
