<?php

namespace App\Helpers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class AccountSession
{
    public static $TO_ARRAY = true;

    public static $sesionName = "app_factory_session";

    public static function isConnected(): bool
    {
        return session(self::$sesionName) ? true : false;
    }


    public static function isEmpty(): bool
    {
        return !self::isConnected();
    }


    public static function getCurrent()
    {
        return session(self::$sesionName);
    }


    public static function getCurrentAccount(): array
    {
        $account = [];
        $rememberToken = self::getCurrent();

        if ($rememberToken) {
            $user = User::where([
                ["remember_token", "=", $rememberToken]
            ])->get()->toArray();
            if (!empty($user)) {
                $account = $user[0];
            }
        }
        return $account;
    }


    public static function save(Request $request, string $rememberToken): bool
    {
        $reponse = true;
        try {
            Session::flush();
            Session::put(self::$sesionName, $rememberToken);
            Session::save();
        } catch (Exception $e) {
            $reponse = false;
        }
        return $reponse;
    }


    public static function forget(Request $request, string $sessionName)
    {
        $request->session()->forget($sessionName);
    }
}
