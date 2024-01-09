<?php

namespace App\Helpers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class PictureHelper
{
    // 5mo
    public const IMAGE_MAX_SIZE = 2048;

    // 15mo
    public const BANNER_MAX_SIZE = 15360;

    public static function rename($file): string
    {
        $ext = $file->guessExtension();
        $newUniqueName =  md5(microtime()) . "." . $ext;
        return $newUniqueName;
    }

    public static function fileDelete(string $path, string $fileName): bool
    {
        $result = false;
        $fullPath = $path . $fileName;
        if (File::exists($fullPath) && $fileName != "default.png") {
            $result = File::delete($fullPath);
            if (File::exists($fullPath)) {
                unlink($fullPath);
            }
        }

        return $result;
    }
}
