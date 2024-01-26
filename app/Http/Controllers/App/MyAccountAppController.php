<?php

namespace App\Http\Controllers\App;

use App\Helpers\AccountSession;
use App\Helpers\ApiHelper;
use App\Helpers\Messengers;
use App\Helpers\Sanitizer;
use App\Http\Controllers\Controller;
use App\Http\Traits\CommonRessourcesTraits;
use App\Http\Traits\UserSessionTraits;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class MyAccountAppController extends Controller
{
    use CommonRessourcesTraits, UserSessionTraits;
    private static $data;
    private $reponseApi = [];

    public function index(Request $request)
    {
        self::bindUiData($request);
        self::$data["pageTitle"] = "Mon profil";
        return view("layouts.app.setting.setting-profil-index", self::$data);
    }


    public function editPasswordProcess(Request $request)
    {
        $this->reponseApi = ApiHelper::DEFAULT_CALLACK;
        $postData = [];

        // Validate form input
        $validated = Validator::make(
            $request->all(),
            [
                'current-password' => ['bail', 'required', 'min:6'],
                'new-password' => ['bail', 'required', 'min:6']
            ],
            [
                "current-password.required" => Messengers::TEXT["error"]["champs"]["requis"],
                "current-password.min" => "6 " . Messengers::TEXT["error"]["string"]["min"],
                "new-password.required" => Messengers::TEXT["error"]["champs"]["requis"],
                "new-password.min" => "6 " . Messengers::TEXT["error"]["string"]["min"]
            ]
        );

        if ($validated->fails()) {
            $this->reponseApi["error"] = $validated->messages()->get('*');
        } else {
            $postData["current-password"] = $request->input("current-password");
            $postData["new-password"] = $request->input("new-password");

            // Check current password
            $targetUser = AccountSession::getCurrentAccount();
            if (!Hash::check($postData["current-password"], $targetUser["password"])) {
                $this->reponseApi["error"]["current-password"] = Messengers::TEXT["error"]["password"]["incorrect"];
            } else {
                // Update password
                if (!User::where(["id" => $targetUser["id"]])->update(["password" => Hash::make($postData["new-password"])])) {
                    $this->reponseApi["error"]["general"] = Messengers::TEXT["error"]["general"]["default"];
                } else {
                    $this->reponseApi["statut"] = true;
                }
            }
        }

        return response()->json($this->reponseApi, 200);
    }

    public function editProfilProcess(Request $request)
    {
        $this->reponseApi = ApiHelper::DEFAULT_CALLACK;
        $postData = [];

        $toCheckData = [
            'fullname' => ['bail', 'required'],
            'email' => ['bail', 'required']
        ];
        $toCheckError = [
            "fullname" => Messengers::TEXT["error"]["champs"]["requis"],
            "email" => Messengers::TEXT["error"]["champs"]["requis"]
        ];

        // Validate form input
        $validated = Validator::make($request->all(), $toCheckData, $toCheckError);

        if ($validated->fails()) {
            $this->reponseApi["error"] = $validated->messages()->get('*');
        } else {
            $targetUser =  [];
            //"", ""
            $targetUser = AccountSession::getCurrentAccount();
            $postData["name"] = Sanitizer::clean($request->input("fullname"));
            $postData["email"] = Sanitizer::clean($request->input("email"));

            // Check if email or hpone is not already used by another one
            $checkExistModels = User::where([["id", "<>", $targetUser["id"]]])->where(function ($sql) use ($postData) {
                $sql->orWhere(["email" => $postData["email"]]);
            })->get();
            if ($checkExistModels->count() > 0) {
                foreach ($checkExistModels as $checkExistModel) {
                    if ($checkExistModel->email == $postData["email"]) {
                        $this->reponseApi["error"]["email"] = Messengers::TEXT["error"]["email"]["deja_utiliser"];
                    }
                }
            } else {
                // Update profil
                if (!User::where(["id" => $targetUser["id"]])->update($postData)) {
                    $this->reponseApi["error"]["general"] = Messengers::TEXT["error"]["general"]["default"];
                } else {
                    $this->reponseApi["statut"] = true;
                }
            }
        }

        return response()->json($this->reponseApi, 200);
    }


    public function bindUiData(Request $request)
    {
        self::bindSessionUser(self::$data);
        self::bindCommonData($request, self::$data);
    }
}
