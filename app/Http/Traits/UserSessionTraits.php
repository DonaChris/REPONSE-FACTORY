<?php

namespace App\Http\Traits;

use App\Helpers\AccountSession;
use App\Helpers\AccountTypeHelper;
use App\Helpers\CountryHelper;
use App\Models\DeliveryOptionModel;
use App\Models\UserAdressModel;
use App\Models\UserMoreDetailModel;
use Illuminate\Support\Str;

trait UserSessionTraits
{
    protected static function bindSessionUser(&$data)
    {
        $hiddens = ["password", "remember_token"];
        $data["sessionUser"] = array_diff_key(AccountSession::getCurrentAccount(), array_flip($hiddens));
    }
}
