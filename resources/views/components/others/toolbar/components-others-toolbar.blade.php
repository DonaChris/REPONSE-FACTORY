<nav class="navbar navbar-fixed-top" style="position: fixed; z-index:99; top:0">
    <div class="container-fluid">
        <div class="navbar-btn">
            <button type="button" class="btn-toggle-offcanvas"><i class="lnr lnr-menu fa fa-bars"></i></button>
        </div>

        <div class="navbar-brand">
            <a href="index.html"><img src="https://www.wrraptheme.com/templates/lucid/html/assets/images/logo.svg"
                    alt="Lucid Logo" class="img-responsive logo"></a>
        </div>

        <div class="navbar-right">
            <div id="navbar-menu">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="{{ route('app-my-account') }}" class="icon-menu">
                            <i class="fa fa-user-circle"></i></a>
                    </li>
                    <li>
                        <a href="{{ route('app-log-out') }}" class="icon-menu">
                            <i class="icon-login text-danger"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav>
