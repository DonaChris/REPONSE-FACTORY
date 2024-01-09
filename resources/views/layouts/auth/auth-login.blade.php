@extends('templates.main-auth')

@section('template-header')
@endsection

@section('template-footer')
    <script src="{{ asset('custom/js/auth/login.js') }}"></script>
@endsection

@section('content')
    <div id="wrapper">
        <div class="vertical-align-wrap">
            <div class="vertical-align-middle auth-main">
                <div class="auth-box">
                    <div class="card">
                        <div class="header">
                            <h3>Bienvenue à {{ env('APP_NAME') }}</h3>
                            <h5 class="lead ">Connecter à votre compte</h5>
                        </div>
                        <div class="body">
                            <form class="form-auth-small" method="post" action="#" id="formLogin">
                                <div class="form-group" data-formidable-errorfor="email">
                                    <label for="email" class="placeholder">E-mail</label>
                                    <input onchange="this.setAttribute('value', this.value);" type="email" value=""
                                        autocomplete="email" name="email" id="email" required
                                        class="form-control app-form-elemnt" />
                                    <div class="error"></div>
                                </div>

                                <div class="form-group" data-formidable-errorfor="password">
                                    <div class="position-relative">
                                        <label for="password" class="placeholder">Mot de passe</label>
                                        <input minlength="6" onchange="this.setAttribute('value', this.value);"
                                            autocomplete="off" value="" id="password" name="password" required
                                            type="password" class="form-control app-form-elemnt"
                                            style="padding-right: 35px" />
                                        <i data-action="password" data-targets="#password"
                                            class="fa-regular fa-eye-slash app-icon-right form-action-icon"
                                            role="button"></i>
                                    </div>
                                    <div class="error"></div>
                                </div>

                                <div class="text-center mt-lg-4 mt-3">
                                    <button name="submit" id="submit" value="submit"
                                        class="app-button-lg app-button-primary app-w-max-100 text-white mt-0  mb-2">
                                        <span style="display: none" class="spinner-border spinner-border-sm spin-progress"
                                            role="status" aria-hidden="true"></span>
                                        <span class="text">Se connecter</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop
