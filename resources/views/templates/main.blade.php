<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('components.others.head.common-head')
    <title>{{ $pageTitle ? $pageTitle : env('APP_DESCRIPTION') }} - {{ env('APP_NAME') }}</title>

    <link rel="stylesheet"
        href="{{ asset('main/vendor/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('main/vendor/jvectormap/jquery-jvectormap-2.0.3.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('main/vendor/morrisjs/morris.min.css') }}" />

    <!-- Custom css -->
    @yield('template-header')
</head>

<body class="preloader-visible theme-color-3 dark" style="overflow-x: hidden">

    <!-- full ldloader -->
    @include('components.loader.common-ld-loader')

    <!-- Pre loader -->
    @include('components.pre-loader')

    <!-- Header section -->
    @include('components.others.toolbar.components-others-toolbar')

    <!-- sidebar section -->
    @include('components.others.nav.components-others-sidebar')


    <!-- Main App -->
    <main class="main main-app-block">
        @yield('content')
    </main>

    <!-- PHP function to JS -->
    @include('components.functions-js')

    <!-- Javascript -->
    <script src="{{ asset('main/bundles/libscripts.bundle.js') }}"></script>
    <script src="{{ asset('main/bundles/vendorscripts.bundle.js') }}"></script>

    <script src="{{ asset('main/bundles/jvectormap.bundle.js') }}"></script>
    <script src="{{ asset('main/bundles/morrisscripts.bundle.js') }}"></script>
    <script src="{{ asset('main/bundles/knob.bundle.js') }}"></script>

    <script src="{{ asset('main/bundles/mainscripts.bundle.js') }}"></script>
    <script src="{{ asset('main/js/index8.js') }}"></script>

    <!-- Common footer -->
    @include('components.others.footer.common-footer-script')

    <!-- Common Script to all page -->
    <script src="{{ asset('custom/js/components/app-common-components.js') }}"></script>


    <!-- Custom footer script -->
    @yield('template-footer')

    <input type="hidden" class="" name="is-auth" value="{{ json_encode(!empty($sessionUser)) }}" id="is-auth">
    @if (!empty($sessionUser))
        <input type="hidden" name="global-user-detail" value="{{ json_encode($sessionUser) }}"
            id="global-user-detail">
    @endif
    <input type="hidden" id="_token" name="_token" value="{{ csrf_token() }}">
</body>

</html>
