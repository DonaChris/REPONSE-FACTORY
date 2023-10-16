<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//d'accueil (home)
Route::get('/', [HomeController::class, 'home'])
    ->name('app_home');

//page contact
Route::get('/contact', [HomeController::class, 'contact'])
    ->name('app_contact');

//page dashboard
Route::match(['get', 'post'], '/dashboard', [HomeController::class, 'dashboard'])
    ->name('app_dashboard');
