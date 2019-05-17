<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Monoland') }}</title>
    <link rel="stylesheet" href="{{ 'styles/' . $pagemode . '.css' }}">
</head>

<style>
    [v-cloack] {
        display: none;
    }
</style>

<body>
    <div id="monoland"></div>

    @if (!$errors->isEmpty()) 
        <script>
            window.errors = {!! $errors  !!};
        </script>
    @else
        <script>
            window.errors = null;
        </script>
    @endif

    <noscript>
        <strong>We're sorry but apps doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>

    <script src="scripts/manifest.js"></script>
    <script src="scripts/vendor.js"></script>
    <script src="{{ 'scripts/' . $pagemode . '.js' }}"></script>
</body>
</html>