<div id="left-sidebar" class="sidebar"
    style=" background: var(--bs-light); border-right: 2px solid var(--app-gray-light-1); ">
    <div class="sidebar-scroll">
        <div class="user-account">
            <img src="{{ asset('main/img/default.jpg') }}" class="rounded-circle user-photo" alt="User Profile Picture">
            <div class="dropdown">
                <span>Bienvenue,</span>
                <a href="javascript:void(0);" class="user-name">
                    <strong>{{ $sessionUser['name'] }}</strong>
                </a>
            </div>
            <hr>
            <ul class="row list-unstyled">
                <li class="col-6 text-center">
                    <small>Production</small>
                    <h6>{{ count($commons['productionList']) ?? 0 }}</h6>
                </li>
                <li class="col-6 text-center ">
                    <small>Terminées</small>
                    <h6>{{ $commons['productionClosedCount'] }}</h6>
                </li>
            </ul>
            <hr>
        </div>

        <!-- Tab panes -->
        <nav id="left-sidebar-nav" class="sidebar-nav">
            <ul id="main-menu" class="metismenu">
                <li>
                    <a href="{{ route('app-dashboard') }}" class="text-decoration-none menu-item">
                        <i class="icon-map"></i>
                        <span>Production</span>
                    </a>
                </li>
                <li>
                    <a href="{{ route('app-my-account') }}" class="text-decoration-none menu-item">
                        <i class="icon-user"></i>
                        <span>Mon profil</span>
                    </a>
                </li>
                <li>
                    <a href="{{ route('app-log-out') }}" class="text-danger text-decoration-none menu-item">
                        <i class="icon-login"></i>
                        <span>Déconexion</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</div>
