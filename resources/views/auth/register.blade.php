@extends('main.main')

@section('title', 'Register')

@section('content')
    <div class="container">
        <div class="row">
            <h1 class="text-center text-muted mb-3 mt-5">Reponse Factories Management</h1>
            <div class="col-md-5 mx-auto">
                <h2 class="text-center text-muted mb-5">Register</h2>
                <p class="text-center text-muted mt-4">Create an account if you don't have one</p>

                <form action="{{ route('register') }}" method="post" class="row g-3">
                    @csrf
                    {{-- First name --}}
                    <div class="col-md-6">
                        <label for="firstname" class="form-label">First Name</label>
                        <input type="text" class="form-control" name="firstname" id="firstname" value="{{ old('firstname') }}" required autocomplete="firstname" autofocus>
                        <small class="text-danger" id="error-register-firstname"></small>
                    </div>

                    {{-- Last name --}}
                    <div class="col-md-6">
                        <label for="lastname" class="form-label">Last Name</label>
                        <input type="text" class="form-control" id="lastname" value="{{ old('lastname') }}" required autocomplete="lastname" autofocus>
                        <small class="text-danger" id="error-register-lastname"></small>
                    </div>

                    {{-- Email --}}
                    <div class="col-md-12">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" name="email" id="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                        <small class="text-danger" id="error-register-email"></small>
                    </div>

                    {{-- Password --}}
                    <div class="col-md-6">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" name="password" id="password" value="{{ old('password') }}" required autocomplete="password" autofocus>
                        <small class="text-danger" id="error-register-password"></small>
                    </div>

                    {{-- confirm password --}}
                    <div class="col-md-6">
                        <label for="confirm_password" class="form-label">Confirmation Password</label>
                        <input type="password" class="form-control" name="confirm_password" id="confirm_password" value="{{ old('confirm_password') }}" required autocomplete="email" autofocus>
                        <small class="text-danger" id="error-register-confirm_password"></small>
                    </div>

                    <div class="col-md-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="agreeTerms">
                            <label class="form-check-label" for="agreeTerm">
                              Agree terms
                            </label>
                            <small class="text-danger" id="error-register-agree-terms"></small>
                        </div>
                    </div>
                    {{-- Bouton Register --}}
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary" type="button" id="register">Register</button>
                    </div>

                    <p class="text-center text-muted mt-4">Already have an account ? <a href="{{ route('login') }}">Login</a> </p>
                </form>
            </div>
        </div>
    </div>
@endsection
