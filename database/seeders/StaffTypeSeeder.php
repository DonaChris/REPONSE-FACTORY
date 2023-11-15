<?php

namespace Database\Seeders;

use App\Helpers\StaffTypeHelpers;
use App\Models\StaffTypeModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StaffTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (StaffTypeHelpers::ALL as $key => $value) {
            $newStaffType = new StaffTypeModel([
                "id" => intval($key),
                "label" => $value
            ]);   
            $newStaffType->save();
        }
    }
}
