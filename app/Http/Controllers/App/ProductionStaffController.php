<?php

namespace App\Http\Controllers\App;

use App\Helpers\ApiHelper;
use App\Helpers\Messengers;
use App\Helpers\Sanitizer;
use App\Http\Controllers\Controller;
use App\Http\Traits\CommonRessourcesTraits;
use App\Http\Traits\UserSessionTraits;
use App\Models\LogStaffTimeModel;
use App\Models\ProductionModel;
use App\Models\StaffModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductionStaffController extends Controller
{
    use CommonRessourcesTraits, UserSessionTraits;
    private static $data;
    private $reponseApi = [];

    public function index(Request $request, ProductionModel $production)
    {
        self::bindUiData($request);
        self::$data["production"] = $production;
        self::$data["pageTitle"] = "Staff";
        self::$data["noBindToken"] = true;

        self::$data["staffs"] = StaffModel::where("production", $production->id)->orderBy("id", "desc")->get();
        self::$data["logStaff"] = LogStaffTimeModel::where('production', $production->id)->orderBy("operation_date", "desc")->get();

        return view("layouts.app.production-staff.production-staff-index", self::$data);
    }

    public function createProcess(Request $request, ProductionModel $production)
    {
        $this->reponseApi = ApiHelper::DEFAULT_CALLACK;

        $validated = Validator::make(
            $request->all(),
            [
                'staff-surname' => ['bail', 'required'],
                'staff-name' => ['bail', 'required'],
                'staff-email' => ['bail', 'required'],
                'staff-ifu' => ['bail', 'required'],
                'staff-phone' => ['bail', 'required'],
                'staff-birthDate' => ['bail', 'required'],
                'staff-type' => ['bail', 'required']
            ],
            [
                "staff-surname.required" => Messengers::TEXT["error"]["champs"]["requis"],
                "staff-name.required" => Messengers::TEXT["error"]["champs"]["requis"],
                "staff-email.required" => Messengers::TEXT["error"]["champs"]["requis"],
                "staff-ifu.required" => Messengers::TEXT["error"]["champs"]["requis"],
                "staff-phone.required" => Messengers::TEXT["error"]["champs"]["requis"],
                "staff-birthDate.required" => Messengers::TEXT["error"]["champs"]["requis"],
                "staff-type.required" => Messengers::TEXT["error"]["champs"]["requis"]
            ]
        );

        if ($validated->fails()) {
            $this->reponseApi["error"] = $validated->messages()->get('*');
        } else {
            $newStaff = new StaffModel();
            $newStaff->surname = Sanitizer::clean($request->input("staff-surname"));
            $newStaff->name = Sanitizer::clean($request->input("staff-name"));
            $newStaff->email = Sanitizer::clean($request->input("staff-email"));
            $newStaff->ifu = Sanitizer::clean($request->input("staff-ifu"));
            $newStaff->phone = Sanitizer::clean($request->input("staff-phone"));
            $newStaff->birthDate = Sanitizer::clean($request->input("staff-birthDate"));
            $newStaff->staff_type = Sanitizer::clean($request->input("staff-type"));
            $newStaff->production = $production->id;

            // Update password
            if (!$newStaff->save()) {
                $this->reponseApi["error"]["general"] = Messengers::TEXT["error"]["general"]["default"];
            } else {
                $this->reponseApi["statut"] = true;
            }
        }

        return response()->json($this->reponseApi, 200);
    }

    public function logProcess(Request $request, ProductionModel $production)
    {
        $validated = Validator::make(
            $request->all(),
            [
                'staff-log-date' => ['bail', 'required'],
            ],
            [
                "staff-log-date.required" => Messengers::TEXT["error"]["champs"]["requis"]
            ]
        );

        if ($validated->fails()) {
            return  redirect()->route('app-staff', ['production' => $production->id])->with('error', $validated->messages()->get('*'));
        }

        $cleanOperationDate = Sanitizer::clean($request->input("staff-log-date"));
        $newStaffLog = new LogStaffTimeModel();

        $newStaffLog->observation = Sanitizer::clean($request->input("staff-log-date") . " ") ?? null;
        $newStaffLog->operation_date = $cleanOperationDate;
        $newStaffLog->production = $production->id;
        $newStaffLog->total_hour = 0;
        $newStaffLog->total_staff = 0;
        $newStaffLog->total_amount = 0;

        if (
            empty($request->input("staff-log-ids")) ||
            empty($request->input("staff-log-hours")) ||
            empty($request->input("staff-log-amounts"))
        ) {
            return  redirect()->route('app-staff', ['production' => $production->id])->with('error', Messengers::TEXT["error"]["general"]["default"]);
        }

        $staffIds = $request->input("staff-log-ids");
        $staffHours = $request->input("staff-log-hours");
        $staffAmount = $request->input("staff-log-amounts");
        $detailJson = [];

        foreach ($staffIds as $index => $value) {
            $newStaffLog->total_hour += $staffHours[$index];
            $newStaffLog->total_staff++;
            $newStaffLog->total_amount += $staffAmount[$index];
            array_push($detailJson, [
                "id" => $staffIds[$index],
                "hour" => $staffHours[$index],
                "amount" => $staffAmount[$index]
            ]);
        }
        $newStaffLog->details = json_encode($detailJson);

        $ifAlreadyExist = LogStaffTimeModel::where([
            "production" => $production->id,
            "operation_date" => date("Y-m-d", strtotime($cleanOperationDate))
        ]);


        if ($ifAlreadyExist->count() > 0 && $ifAlreadyExist->Update($newStaffLog->toArray())) {
            return  redirect()->route('app-staff', ['production' => $production->id])->with('success', 'ok');
        }

        if ($ifAlreadyExist->count() < 1 && $newStaffLog->save()) {
            return  redirect()->route('app-staff', ['production' => $production->id])->with('success', 'ok');
        }

        return  redirect()->route('app-staff', ['production' => $production->id])->with('error', Messengers::TEXT["error"]["general"]["default"]);
    }

    public function bindUiData(Request $request)
    {
        self::bindSessionUser(self::$data);
        self::bindCommonData($request, self::$data);
    }
}
