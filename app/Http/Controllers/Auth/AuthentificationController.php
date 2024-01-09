<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\AccountCookies;
use App\Helpers\AccountSession;
use App\Helpers\ApiHelper;
use App\Helpers\Messengers;
use App\Helpers\Sanitizer;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthentificationController extends Controller
{

    public static $data;
    private $reponseApi;

    public function login(Request $request)
    {
        self::$data["pageTitle"] = "Se connecter";
        return view("layouts.auth.auth-login", self::$data);
    }

    public function loginProcess(Request $request)
    {
        $this->reponseApi = ApiHelper::DEFAULT_CALLACK;
        $postData = [];
        // Validate form input
        $validated = Validator::make(
            $request->all(),
            [
                'email' => ['bail', 'required', "email:dns,rfc"],
                'password' => ['bail', 'required']
            ],
            [
                "email.*" => Messengers::TEXT["error"]["champs"]["requis"],
                "password.*" => Messengers::TEXT["error"]["champs"]["requis"]
            ]
        );

        if ($validated->fails()) {
            $this->reponseApi["error"] = $validated->messages()->get('*');
        } else {
            $postData["email"] = Sanitizer::clean($request->input("email"));
            $postData["password"] = $request->input("password");

            $targerUserModel = User::where(["email" => $postData["email"]]);
            $targerUserAccount = $targerUserModel->get()->toArray();

            if (empty($targerUserAccount)) {
                $this->reponseApi["error"]["email"] = Messengers::TEXT["error"]["email"]["aucun_compte"];
            } else {
                $targerUserAccountDetail = $targerUserAccount[0];

                // check password
                if (!Hash::check($postData["password"], $targerUserAccountDetail["password"])) {
                    $this->reponseApi["error"]["password"] = Messengers::TEXT["error"]["password"]["incorrect"];
                } else {
                    // If not exist, generate remember me token and save
                    $rememberMeToken = $targerUserAccountDetail["remember_token"];
                    if (empty($rememberMeToken)) {
                        $rememberMeToken = Hash::make($targerUserAccountDetail["id"] . "_" . Str::random(10));
                        $targerUserModel->update(["remember_token" => $rememberMeToken]);
                    }
                    AccountCookies::setCookie($rememberMeToken);
                    $request->session()->flush();
                    AccountSession::save($request, $rememberMeToken);

                    $this->reponseApi["statut"] = true;
                    $this->reponseApi["redirection"] = route("auth-login");
                }
            }
        }
        return response()->json($this->reponseApi, 200);
    }

    public function logout(Request $request)
    {
        AccountSession::forget($request, AccountSession::$sesionName);
        AccountCookies::removeCookies(AccountCookies::COOKIES_NAME);
        return redirect(url()->previous());
    }
}
