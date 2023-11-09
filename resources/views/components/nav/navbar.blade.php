<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
        <a class="navbar-brand" href="{{ config('app.name') }}">ReponseFactory</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link @if (Request::route()->getName() == 'app_home') active @endif" aria-current="page"
                        href="{{ route('app_home') }}">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link @if (Request::route()->getName() == 'app_contact') active @endif" aria-current="page"
                        href="{{ route('app_contact') }}">Contact</a>
                </li>
            </ul>
        </div>

        <div class="btn-group">
            {{-- menu du bouton avant authentification des users --}}
            @guest
                <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    My Account
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="{{ route('login') }}">Login</a></li>
                    <li><a class="dropdown-item" href="{{ route('register') }}">Register</a></li>
                </ul>
            @endguest
                {{-- menu du bouton après authentification des users --}}
            @auth
                <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    {{ Auth::user()->name }}
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="{{ route('app_logout') }}">Logout</a></li>
                </ul>
            @endauth
        </div>
    </div>
</nav>
