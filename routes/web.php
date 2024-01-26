<?php

use App\Http\Controllers\App\HomeController;
use App\Http\Controllers\App\MyAccountAppController;
use App\Http\Controllers\App\ProductionAppController;
use App\Http\Controllers\App\ProductionRapportAppController;
use App\Http\Controllers\App\ProductionStaffController;
use App\Http\Controllers\Auth\AuthentificationController;
use Illuminate\Support\Facades\Route;



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

Route::redirect('', 'app/dashboard');
Route::redirect('/', 'app/dashboard');
Route::redirect('/app', 'app/dashboard');
Route::redirect('/auth', 'auth/connexion');


/**
 *--------------------------------------------------------------------------
 * Authentification
 *--------------------------------------------------------------------------
 */

Route::prefix('auth')->middleware('global.auth')->group(function () {
    // Login
    Route::get('connexion', [AuthentificationController::class, 'login'])->name('auth-login');
    Route::post('connexion', [AuthentificationController::class, 'loginProcess'])->name('auth-login-process');
});




/**
 *--------------------------------------------------------------------------
 * App
 *--------------------------------------------------------------------------
 */

Route::prefix("app")->middleware('global.auth')->group(function () {

    // Dashboard
    Route::get('dashboard', [HomeController::class, 'index'])->name('app-dashboard');

    // welcome (profil dashboard)
    Route::prefix('mon-compte')->group(function () {
        Route::get('', [MyAccountAppController::class, 'index'])->name('app-my-account');
        // Update profil
        Route::post('edit-profil-information', [MyAccountAppController::class, 'editProfilProcess'])->name('app-my-account-process');
        // Update password
        Route::post('edit-password', [MyAccountAppController::class, 'editPasswordProcess'])->name('app-my-account-password-process');
    });

    // welcome (production détail dashboard)
    Route::prefix('production')->group(function () {
        // List all productions
        Route::post('', [ProductionAppController::class, 'createProcess'])->name('app-production-create-process');
        // Show production dashboard control
        Route::prefix('{production}')->group(function () {
            Route::get('', [ProductionAppController::class, 'show'])->name('app-production-show');
            Route::post('edit', [ProductionAppController::class, 'editProcess'])->name('app-production-edit-process');

            // STAFF gestion
            Route::prefix('staff')->group(function () {
                Route::get('', [ProductionStaffController::class, 'index'])->name('app-staff');
                Route::post('add', [ProductionStaffController::class, 'createProcess'])->name('app-staff-add-process');

                Route::post('log-process', [ProductionStaffController::class, 'logProcess'])->name('app-staff-log-process');
            });

            // Production Rapport routes
            Route::get('rapports', [ProductionRapportAppController::class, 'index'])->name('app-production-rapports');
        });
    });

    // Logout
    Route::get('deconnexion', [AuthentificationController::class, 'logout'])->name('app-log-out');
});
