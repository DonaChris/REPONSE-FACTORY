<?php

namespace App\Helpers;

class MyUrlHelper
{
    public static function getPrefix($url)
    {
        $detail = explode("/", $url);
        $prefix = null;

        foreach ($detail as $urlPart) {
            if (trim($urlPart) != "") {
                $prefix = trim($urlPart);
                break;
            }
        }

        return $prefix;
    }
}
