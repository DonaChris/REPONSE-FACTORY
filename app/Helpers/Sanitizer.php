<?php

namespace App\Helpers;

use Illuminate\Support\Str;

class Sanitizer
{
    public static function clean(string|int $data, bool $canTrim = true): string|int
    {
        $get = stripslashes($data);

        $get = htmlspecialchars($get);

        return $canTrim ? trim($get) : $get;
    }

    public static function formatNumber($number, $decimal = 2, $separator = " ")
    {
        return number_format($number, $decimal, ".", $separator);
    }

    public static function uniqSlugGenerator($data, $model, $column = "slug"): string
    {
        $slug = Str::slug($data);
        $randomLeng = 1;
        $checkSlug = $model::where([$column => $slug]);

        while ($checkSlug->count() > 0) {
            $slug .= "-" . Str::random($randomLeng);
            $randomLeng++;
            $checkSlug = $model::where([$column => $slug]);
        };

        return $slug;
    }
}
