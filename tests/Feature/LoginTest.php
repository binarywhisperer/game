<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use GuzzleHttp\Client;

class LoginTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testStatus()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    public function testCreate()
    {
        $response = $this->get('/');
        $response->assertSee('Create Account');

        // create our http client (Guzzle)
        $client = new Client();


        $data = ['form_params' => [
                'name' => 'MuadDib',
                'email' => 'muaddib@email.com',
                'password' => '123456'
            ]];
        $request = $client->request('POST','/register', $data);
        $response = $request->send();
        $response->assertStatus(200);

    }

    public function testLogIn()
    {
        $response = $this->get('/');
        $response->assertSee('Log In');
    }
}
