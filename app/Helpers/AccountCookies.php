<?php

namespace App\Helpers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class AccountCookies
{
    public const COOKIES_NAME = "app_factory_sur_session";
    private const COOKIES_LIVE_MINUTE = 44460;



    public static function setCookie($cookiesValue)
    {
        Cookie::queue(self::COOKIES_NAME, $cookiesValue, self::COOKIES_LIVE_MINUTE);
    }



    public static function getCookie(Request $request)
    {
        return $request->cookie(self::COOKIES_NAME, null);
    }



    public static function removeCookies($cookieName)
    {
        Cookie::queue(Cookie::forget($cookieName));
    }
}
