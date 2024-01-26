<?php

namespace App\Http\Controllers\App;

use App\Helpers\StatusHelpers;
use App\Http\Traits\CommonRessourcesTraits;
use App\Http\Traits\UserSessionTraits;
use Illuminate\Http\Request;

class ProductionRapportAppController
{
    use CommonRessourcesTraits, UserSessionTraits;
    //
    private static $data;

    public function index(Request $request)
    {
        self::bindUiData($request);
        self::$data["pageTitle"] =  "Rapport";
        return view("layouts.app.production-rapport.production-rapport-index", self::$data);
    }

    public function bindUiData(Request $request)
    {
        self::bindSessionUser(self::$data);
        self::bindCommonData($request, self::$data);
    }
}
