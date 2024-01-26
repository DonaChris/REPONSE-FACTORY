<?php

namespace App\Http\Traits;

use App\Helpers\AppGlobalSettingsHelpers;
use App\Helpers\MultiLanguageHelper;
use App\Helpers\ShoppingCardHelpers;
use App\Helpers\StatusHelpers;
use App\Models\AppGlobalSettingsModel;
use App\Models\CountryModel;
use App\Models\MainBannerModel;
use App\Models\ProductionModel;
use App\Models\ShoppingCartModel;
use App\Models\TextBannerModel;
use Illuminate\Http\Request;

trait CommonRessourcesTraits
{
    public function bindCommonData(Request $request, &$array)
    {
        $todayDate = date("Y-m-d") . " 00:00:00";
        // Count production
        $array["commons"]["productionList"] =  ProductionModel::orderBy("id", "desc")->get();
        $array["commons"]["productionClosedCount"] =  ProductionModel::where(["closed_status" => StatusHelpers::ACTIF])->get()->count();
    }
}
