<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LogStaffTimeModel extends Model
{
    use HasFactory;

    protected $table = 'log-staff-time';

    protected $fillable = [
        'hour_work',
        'observations',
        'staff'
    ];

    public function getStaff() {
        $this->belongsTo(StaffModel::class, 'staff', 'id');
    }
}
