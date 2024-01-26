<?php

namespace App\Http\Controllers\App;

use App\Helpers\AccountSession;
use App\Helpers\ApiHelper;
use App\Helpers\Messengers;
use App\Helpers\Sanitizer;
use App\Helpers\StatusHelpers;
use App\Http\Controllers\Controller;
use App\Http\Traits\CommonRessourcesTraits;
use App\Http\Traits\UserSessionTraits;
use App\Models\ProductionModel;
use App\Models\StaffTypeModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class ProductionAppController extends Controller
{
    use CommonRessourcesTraits, UserSessionTraits;
    private static $data;
    private $reponseApi = [];

    public function createProcess(Request $request)
    {
        $this->reponseApi = ApiHelper::DEFAULT_CALLACK;

        $validated = Validator::make(
            $request->all(),
            [
                'name' => ['bail', 'required'],
                'exception_completion_at' => ['bail', 'required'],
                'goal' => ['bail', 'required']
            ],
            [
                "name.required" => Messengers::TEXT["error"]["champs"]["requis"],
                "exception_completion_at.required" => Messengers::TEXT["error"]["champs"]["requis"],
                "goal.required" => Messengers::TEXT["error"]["champs"]["requis"]
            ]
        );

        if ($validated->fails()) {
            $this->reponseApi["error"] = $validated->messages()->get('*');
        } else {
            $targetUser = AccountSession::getCurrentAccount();
            $newProduction = new ProductionModel();
            $newProduction->name = Sanitizer::clean($request->input("name"));
            $newProduction->slug = Str::slug($newProduction->name);
            $newProduction->goal = Sanitizer::clean($request->input("goal"));
            $newProduction->closed_status = StatusHelpers::INACTIF;
            $newProduction->exception_completion_at = Sanitizer::clean($request->input("exception_completion_at"));
            $newProduction->user = $targetUser['id'];

            // Update password
            if (!$newProduction->save()) {
                $this->reponseApi["error"]["general"] = Messengers::TEXT["error"]["general"]["default"];
            } else {
                $this->reponseApi["statut"] = true;
            }
        }

        return response()->json($this->reponseApi, 200);
    }

    public function show(Request $request, ProductionModel $production)
    {
        self::bindUiData($request);
        self::$data["pageTitle"] = $production->name;
        self::$data["production"] = $production;
        self::$data["staffTypeList"] = StaffTypeModel::orderBy('label', "asc")->get();

        return view("layouts.app.production.production-index", self::$data);
    }

    public function editProcess(Request $request, ProductionModel $production)
    {
        $this->reponseApi = ApiHelper::DEFAULT_CALLACK;

        $columsUpdatable = ["name", "exception_completion_at", "goal", "closed_status"];

        foreach ($columsUpdatable as $column) {
            if (!empty($request->input($column))) {
                $production->$column = Sanitizer::clean($request->input($column));
            }
        }

        if (!$production->save()) {
            $this->reponseApi["error"]["general"] = Messengers::TEXT["error"]["general"]["default"];
        } else {
            $this->reponseApi["statut"] = true;
        }

        return response()->json($this->reponseApi, 200);
    }


    public function bindUiData(Request $request)
    {
        self::bindSessionUser(self::$data);
        self::bindCommonData($request, self::$data);
    }
}
