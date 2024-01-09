<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('components.others.head.common-head')

    <title>{{ env('APP_NAME') }} : {{ $pageTitle ? $pageTitle : env('APP_DESCRIPTION') }}</title>
    <style>

    </style>
    <!-- Custom css -->
    @yield('template-header')
</head>

<body class="preloader-visible theme-cyan">

    <!-- full ldloader -->
    @include('components.loader.common-ld-loader')

    <!-- Pre loader -->
    @include('components.pre-loader')

    <!-- Main App -->
    <main class="main main-app-block">
        @yield('content')
    </main>

    <!-- PHP function to JS -->
    @include('components.functions-js')

    <!-- Common footer -->
    @include('components.others.footer.common-footer-script')

    <!-- Common Script to all page -->
    <script src="{{ asset('custom/js/components/auth-common-components.js') }}"></script>

    <!-- Custom footer script -->
    @yield('template-footer')

    <input type="hidden" class="" name="is-auth" value=" {{ json_encode([]) }} " id="is-auth">
    <input type="hidden" id="_token" name="_token" value="{{ csrf_token() }}">
</body>

</html>
