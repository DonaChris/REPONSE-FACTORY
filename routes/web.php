<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;



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

Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'home')->name('app_home');
    Route::get('/contact', 'contact')->name('app_contact');
    Route::match(['get', 'post'], '/dashboard', 'dashboard')->middleware('auth')->name('app_dashboard');
});

Route::controller(LoginController::class)->group(function () {
    Route::get('/logout', 'logout')->name('app_logout');
    Route::post('/existEmail','existEmail')->name('app_existEmail');
});
