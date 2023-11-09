@extends('index')

@section('title', 'Login')

@section('content')
    <div class="container">
        <h1 class="text-center text-muted mb-3 mt-5">Reponse Factories Management</h1>
        <div class="row">
            <h2 class="text-center text-muted mb-5">Please sign in</h2>
            <div class="col-md-4 mx-auto">
                <form action="{{ route('login') }}" method="post">
                    @csrf

                    {{-- Message d'erreur : mail --}}
                    @error('email')
                        <div class="alert alert-danger text-center" role="alert">
                            {{ $message }}
                        </div>
                    @enderror
                    {{-- Message d'erreur : password --}}
                    @error('password')
                        <div class="alert alert-danger text-center" role="alert">
                            {{ $message }}
                        </div>
                    @enderror

                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" class="form-control mb-3 @error('email') is-invalid @enderror" value="{{ old('email') }}" required autocomplete="email" autofocus>

                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" class="form-control mb-3 @error('passwordclear') is-invalid @enderror" required autocomplete="current-password" autofocus>

                    <div class="row" mb-3>
                        <div class="col-md-6">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="remember" name="remember" {{ old('remember') ? 'checked' : ''}}>
                                <label class="form-check-label" for="remember">Remember me</label>
                            </div>
                        </div>
                        <div class="col-md-6 text-end">
                            <a href="#">Forgot password</a>
                        </div>
                    </div>

                    <div class="d-grid gap-2">
                        <button class="btn btn-primary btn-block mt-3" type="submit">Sign in</button>
                    </div>

                    <p class="text-center text-muted mt-4">Not registered yet ? <a href="{{ route('register') }}">Create an account</a> </p>
                    
                </form>
            </div>
        </div>
    </div>
@endsection
