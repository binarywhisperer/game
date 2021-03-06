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
    <link href="css/app.css" rel="stylesheet">
    <link href="css/bulma.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">
</head>
<body>
@include ('master.nav')
@yield('content')
@include ('master.footer')
@include ('master.modal')
@include ('master.variables')
<script>var socketUrl = "{{ env('APP_URL') }}:3000"; </script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
<script src="js/master.js"></script>
@yield('javascript')
</body>
</html>
