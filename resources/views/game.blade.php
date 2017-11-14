<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Game</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <style>
            html, body {
                height: 100vh;
            }
            .container{
                display:inline-flex;
                height:100%;
                width:100%;
                align-items: center;
                justify-content: center;
            }
            .board{
                display: grid;
                height:600px;
                width:600px;
                background: #333;
            }
            .row{
                display:inline-grid;
                grid-column: 1/span 3;
            }
            .location{
                grid-row: 1/span 1;
            }
            .row:nth-of-type(2n) .location:nth-of-type(2n) {
                background-color:#ddd;
            }

            .row:nth-of-type(2n+1) .location:nth-of-type(2n+1) {
                background-color:#ddd;
            }

        </style>
    </head>
    <body>
    <div class="container">
        <div class="board">
            <div class="row">
                <div class="location"></div>
                <div class="location"></div>
                <div class="location"></div>
            </div>
            <div class="row">
                <div class="location"></div>
                <div class="location"></div>
                <div class="location"></div>
            </div>
            <div class="row">
                <div class="location"></div>
                <div class="location"></div>
                <div class="location"></div>
            </div>
        </div>
    </div>
    </body>
</html>
