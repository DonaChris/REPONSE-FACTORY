<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0">

        {{-- Génère dynamiquement les titres des pages --}}
        <title>{{ config('app.name') }} | @yield('title') </title>

        {{-- Fichiers CSS --}}
        <link rel="stylesheet" href="{{ asset('assets/style.css') }}">
    </head>
    <body>
        {{-- Loader-page --}}
        {{-- @include('components.others.loader-page') --}}

        {{-- Navbar --}}
        @include('components.nav.navbar')

        {{-- Sidebar --}}
        {{-- @include('components.nav.sidebar') --}}

        {{-- Toutes les pages hériteront du contenu de cette page --}}
        @yield('content')

        {{-- scripts JS --}}
        @include('components.others.script')
    </body>
</html>
