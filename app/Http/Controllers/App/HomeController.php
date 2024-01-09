<?php

namespace App\Http\Controllers\App;

use App\Helpers\StatusHelpers;
use App\Http\Traits\CommonRessourcesTraits;
use App\Http\Traits\UserSessionTraits;
use Illuminate\Http\Request;

class HomeController
{
    use CommonRessourcesTraits, UserSessionTraits;
    //
    private static $data;

    public function index(Request $request)
    {
        self::bindUiData($request);
        self::$data["pageTitle"] =  "Tableau de bord";
        return view("layouts.app.home.home-index", self::$data);
    }

    public function bindUiData(Request $request)
    {
        self::bindSessionUser(self::$data);
        self::bindCommonData($request, self::$data);
    }
}
