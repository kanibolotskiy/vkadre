<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel React application</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap" rel="stylesheet">
        <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
        
        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: #000;
                font-family: 'Roboto';
                font-size:13px;
                font-weight: 200;
                height: 100vh;
                margin: 0;
                padding:0;
            }
            #root{height: 100vh;}
        </style>

    </head>
    <body>
        <div id="root"></div>
        <script src="{{mix('js/app.js')}}" ></script>
    </body>
</html>
