<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffModel extends Model
{
    use HasFactory;

    protected $table = 'staff';

    protected $fillable = [
        'name',
        'surname',
        'email',
        'IFU',
        'phone',
        'birthDate',
        'staff_type',
        'production'
    ];

    public function getStaffType() {
        $this->belongsTo(StaffTypeModel::class, 'staff_type', 'id');
    }

    public function getProduction() {
        $this->belongsTo(ProductionModel::class, 'production', 'id');
    }
}
