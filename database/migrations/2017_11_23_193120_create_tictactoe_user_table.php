<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTictactoeUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tic_tac_toe_user', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tic_tac_toe_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->foreign('tic_tac_toe_id')->references('id')->on('tic_tac_toes')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tic_tac_toe_user');
    }
}
