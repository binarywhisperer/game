<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Game</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="css/bulma.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">
    <style>
        html,body{
            height:100%;
        }
        body{
            display: flex;
            align-items: center;
            justify-content: center;
            background: url('../img/login-background-min.jpg');
            background-size:cover;
        }
        h2{
            text-align:center;
            color:#666;
            font-weight:700;
            margin-bottom:20px;
        }

        .button.is-success:hover,
        .button.is-success.is-hovered {
            background-color: #2d3032;
        }
        .button.is-success{
            background-color: #383b3d;
        }
        .flex-container{
            width: 33%;
            background: rgba(255,255,255,.95);
            min-width: 200px;
            padding: 15px;
            border-radius: 6px;
            box-shadow: 1px 1px 2px 1px rgba(0,0,0,.2);
        }
        @media screen and (max-width:1100px){
            .flex-container {
                width: 50%;
            }
        }
        @media screen and (max-width:700px){
            .flex-container {
                width: 90%;
            }
        }
    </style>
</head>
<body>
<div class="flex-container">
    <h2>Log In</h2>
    <form class="form-horizontal" method="POST" action="{{ route('login') }}">
        {{ csrf_field() }}
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" name="email" type="email" value="{{ old('email') }}" placeholder="Email" required>
                <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                    </span>
                <span class="icon is-small is-right">
                      <i class="fa fa-check"></i>
                    </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" name="password" type="password" placeholder="Password" required>
                <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                    </span>
            </p>
        </div>
        <div class="field">
            <p class="control">
                <button type="submit" class="button is-primary">
                    Login
                </button>
                <label class="checkbox">
                    <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}>
                    Remeber Me
                </label>
            </p>
        </div>
        <div class="field">
            <p class="control">
                <a class="btn btn-link" href="{{ route('password.request') }}">
                    Forgot Your Password?
                </a>
            </p>
        </div>
    </form>
    <hr>
    <h2>Create Account</h2>
    <form class="form-horizontal" method="POST" action="{{ route('register') }}">
        {{ csrf_field() }}
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" name="name" type="text" placeholder="User Name" minlength="2" maxlength="13" required>
                <span class="icon is-small is-left">
                      <i class="fa fa-user-circle"></i>
                    </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" name="email" type="email" value="{{ old('email') }}" placeholder="Email" required>
                <span class="icon is-small is-left">
                        <i class="fa fa-envelope"></i>
                    </span>
                <span class="icon is-small is-right">
                       <i class="fa fa-check"></i>
                    </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" name="password" type="password" placeholder="Password" required>
                <span class="icon is-small is-left">
                       <i class="fa fa-lock"></i>
                    </span>
            </p>
        </div>
        <div class="field">

        </div>
        <div class="field">
            <p class="control">
                <input type="submit" class="button is-primary" value="Create Account">
            </p>
        </div>
    </form>
</div>
</body>
</html>