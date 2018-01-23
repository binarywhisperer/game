<?php

namespace App\Http\Controllers;

use App\Edges;
use App\Instance;
use App\Instances\Checkers;
use App\Instances\Chess;
use App\Instances\TicTacToe;
use App\Schematic;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InstanceController extends Controller
{

    public function turn(Request $request, Instance $instance){
        $concrete = $instance->getConcrete();
        return $concrete->turn($request);
    }

    public function join(Request $request){
        $user = User::find($request->gamer);
        $schematic = Schematic::find($request->schematic);
        $startings = Instance::where([['status','Starting'],['schematic_id',$request->schematic]])->get();
        if(count($startings) > 0){
            foreach($startings as $starting){
                $concrete = $starting->getConcrete();
                if($concrete->addUser($user)){
                    $concrete->status = 'In Progress';
                    $concrete->save();
                    break;
                }
            }
        }else{
            $newInstance = $schematic->createInstance();
            $newInstance->generate($request, $user);
        }
    }
    public function selects($userid){
        $user = User::find($userid);
        return  $user->selects()->toJson();
    }

    private function createInstance($schematic_id){
        $schematic = Schematic::find($schematic_id);
        if($schematic->name == 'Tic Tac Toe'){
            return new TicTacToe();
        }elseif($schematic->name == 'Checkers'){
            return new Checkers();
        }elseif($schematic->name == 'Chess'){
            return new Chess();
        }
    }

    private function getInstance($isntance_id){
        $schematic = Schematic::find($schematic_id);
        if($schematic->name == 'Tic Tac Toe'){
            return new TicTacToe();
        }elseif($schematic->name == 'Checkers'){
            return new Checkers();
        }elseif($schematic->name == 'Chess'){
            return new Chess();
        }
    }
}