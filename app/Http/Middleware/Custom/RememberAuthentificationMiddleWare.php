<?php

namespace App\Http\Middleware\Custom;

use App\Helpers\AccountCookies;
use App\Helpers\AccountSession;
use App\Helpers\StatusHelpers;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class RememberAuthentificationMiddleWare
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $isConnected = AccountSession::isConnected();

        // Check if session is défined and try to login stored account
        if (!$isConnected) {
            $rememberToken = AccountCookies::getCookie($request);
            if (!empty($rememberToken)) {
                // Check if cookies is really availible
                // "status" => StatusHelpers::ACTIF
                $user = User::where(["remember_token" => $rememberToken])->get();
                if ($user->count() == 1) {
                    $request->session()->flush();
                    AccountSession::save($request, $rememberToken);
                    AccountCookies::setCookie($rememberToken);
                    $isConnected = true;
                }
            }
        }

        return $next($request);
    }
}
