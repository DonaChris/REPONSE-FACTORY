<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Génère dynamiquement les titres des pages --}}
        <title>{{ config('app.name') }} | @yield('title') </title>

        {{-- Fichiers CSS --}}
        <link rel="stylesheet" href="{{ asset('assets/style_app.css') }}">
    </head>
    <body>
        {{-- Barre de navigation --}}
        @include('nav.navbar')

        {{-- Toutes les pages hériteront du contenu de cette page --}}
        @yield('content')

        {{-- Fichiers contenant les cripts JS --}}
        @include('main.footer-script')
    </body>
</html>
