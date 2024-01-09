<?php

namespace App\Http\Middleware\Custom;

use App\Helpers\AccountCookies;
use App\Helpers\AccountSession;
use App\Helpers\Messengers;
use App\Helpers\MyUrlHelper;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class AppAuthentificationMiddleWare
{
    private const ATTR_SHOULD_BE_CONNECTED = "connected";
    private const ATTR_ON_CONTROL_FAILED = "on-failed";
    private const ATTR_MODEL = "model";
    private static $controls = [];


    private static function setControl()
    {
        /***
         * Section to edit
         */
        // Definition of prefix and his controls
        self::$controls = [
            // Authentification
            "auth" => [
                self::ATTR_SHOULD_BE_CONNECTED => false,
                self::ATTR_ON_CONTROL_FAILED => route("app-dashboard")
            ],
            // Dashboard
            "app" => [
                self::ATTR_SHOULD_BE_CONNECTED => true,
                self::ATTR_ON_CONTROL_FAILED => route("auth-login"),
                self::ATTR_MODEL => User::class,
            ]
            // .....
        ];
    }


    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        self::setControl();

        // Extract prefix from the url
        $prefix = MyUrlHelper::getPrefix($request->route()->getPrefix());

        // Get défine's control related to the current prefix
        $control = self::$controls[$prefix];

        $isConnected = AccountSession::isConnected();

        // Check if he accout is lock
        if ($isConnected) {
            $getCurrentAccount = AccountSession::getCurrentAccount();
            if (empty($getCurrentAccount)) {
                $request->session()->flush();
                AccountCookies::removeCookies(AccountCookies::COOKIES_NAME);
                return redirect($control[self::ATTR_ON_CONTROL_FAILED])->with(Messengers::statusMessage(data: ["email" => Messengers::TEXT["error"]["compte"]["session_expirer"]]));
            }
        }

        // Check and Redirect to the right route
        if ($isConnected == $control[self::ATTR_SHOULD_BE_CONNECTED]) {
            return $next($request);
        }
        // redirectect to the vérification failed route
        else {
            return redirect($control[self::ATTR_ON_CONTROL_FAILED]);
        }
    }
}
