@extends('templates.main')



@section('template-header')
@endsection



@section('template-footer')
    <script src="{{ asset('custom/js/app/setting/setting-profil-index.js?e') }}"></script>
@endsection



@section('content')
    <div class="pt-3">
        <section class="section-best-product mb-lg-5  mt-3 mb-0">
            <div class="container-lg">
                <div class="mb-lg-3">
                    <h4 class="ps-lg-0 app-text-gray page-title mb-4">
                        <i class="fa fa-user-circle me-2 app-text-primary"></i>
                        {{ $pageTitle }}
                    </h4>
                </div>
                <hr>
                <div class="my-4 bg-white p-4" style="border-radius: 15px">
                    <p class="h5 mb-1">
                        <i class="fa fa-lock me-2 app-text-primary"></i>
                        Compte
                    </p>
                    <small class="text-muted app-fs-12px">Changer les détails de votre compte</small>
                    <form method="post" action="#" class="row" id="formDetail" enctype="multipart/form-data">
                        <div class="form-group col-lg-6 mt-4" data-formidable-errorfor="fullname">
                            <label for="">
                                <span class="placeholder postiion-2">Nom et prénoms</span>
                            </label>
                            <input type="text" autocomplete="name" value="{{ html_entity_decode($sessionUser['name']) }}"
                                name="fullname" id="fullname" required class="form-control app-form-elemnt"
                                style="height: fit-content" />
                            <div class="error"></div>
                        </div>

                        <div class="form-group mt-4 col-lg-6" data-formidable-errorfor="email">
                            <label for="">
                                <span class="placeholder postiion-2">E-mail</span>
                            </label>
                            <input onchange="this.setAttribute('value', this.value);" type="email"
                                value="{{ $sessionUser['email'] }}" autocomplete="email" name="email" id="email"
                                style="height: fit-content" required class="form-control app-form-elemnt" />
                            <div class="error"></div>
                        </div>

                        <div class="text-end col-lg-2 mt-2">
                            <button name="submit" id="submit" value="submit"
                                class="app-button-lg app-button-primary app-w-max-100 text-white mt-0  mb-2">
                                <span style="display: none" class="spinner-border spinner-border-sm spin-progress"
                                    role="status" aria-hidden="true"></span>
                                <span class="text">Enregistrer</span>
                            </button>
                        </div>
                    </form>
                </div>

                <div class="my-4 bg-white p-4" style="border-radius: 15px">
                    <p class="h5 mb-1">
                        <i class="fa fa-lock me-2 app-text-primary"></i>
                        Mot de passe
                    </p>
                    <small class="text-muted app-fs-12px">Changer le mot de passe de votre compte</small>

                    <form method="post" action="#" class="row" id="formPassword">
                        <div class="form-group col-lg-6 mt-3" data-formidable-errorfor="current-password">
                            <div class="position-relative">
                                <label for="">
                                    <span class="placeholder">Mot de passe actuel</span>
                                </label>
                                <input minlength="6" onchange="this.setAttribute('value', this.value);" autocomplete="off"
                                    value="" id="current-password" name="current-password" required type="password"
                                    class="form-control app-form-elemnt" style="padding-right: 35px" />
                                <i data-action="password" data-targets="#current-password"
                                    class="fa-regular fa-eye-slash app-icon-right form-action-icon" role="button"></i>
                            </div>
                            <div class="error"></div>
                        </div>

                        <div class="form-group col-lg-6 mt-3" data-formidable-errorfor="new-password">
                            <div class="position-relative">
                                <label for="">
                                    <span class="placeholder">Nouveau mot de passe</span>
                                </label>
                                <input minlength="6" onchange="this.setAttribute('value', this.value);" autocomplete="off"
                                    value="" id="new-password" name="new-password" required type="password"
                                    class="form-control app-form-elemnt" style="padding-right: 35px" />

                                <i data-action="password" data-targets="#new-password"
                                    class="fa-regular fa-eye-slash app-icon-right form-action-icon" role="button"></i>
                            </div>
                            <div class="error"></div>
                        </div>

                        <div class="text-end  col-lg-2 mt-2">
                            <button name="submit-password" id="submit-password" value="submit"
                                class="app-button-lg app-button-primary app-w-max-100 text-white mt-0  mb-2">
                                <span style="display: none" class="spinner-border spinner-border-sm spin-progress"
                                    role="status" aria-hidden="true"></span>
                                <span class="text">Enregistrer</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </section>
    </div>

    <div class="py-4 py-lg-5">
        <div class="py-4 py-lg-5">
            <span style="opacity: 0">-</span>
        </div>
    </div>

@stop
