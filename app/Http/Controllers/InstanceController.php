<?php

namespace App\Http\Controllers;

use App\Edges;
use App\Instance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InstanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Instance  $instance
     * @return \Illuminate\Http\Response
     */
    public function show(Instance $instance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Instance  $instance
     * @return \Illuminate\Http\Response
     */
    public function edit(Instance $instance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Instance  $instance
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Instance $instance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Instance  $instance
     * @return \Illuminate\Http\Response
     */
    public function destroy(Instance $instance)
    {
        //
    }

    public function join(Request $request){
        $user = Auth::user();
        $startings = Instance::where([['status','Starting'],['schematic_id',$request->schematic]])->get();
        if(count($startings) > 0){
            foreach($startings as $starting){
                if($starting->addUser($user)){
                    $starting->status = 'In Progress';
                    $starting->save();
                    break;
                }
            }
        }else{
            $newLobby = new Instance();
            $newLobby->schematic_id = $request->schematic;
            $newLobby->status = 'Starting';
            $newLobby->save();
            $newLobby->users()->attach($user->id);

            $newEdges = new Edges();
            $newEdges->instance_id = $newLobby->id;
            $newEdges->edges = json_encode([]);
            $newEdges->save();
        }
    }
}
