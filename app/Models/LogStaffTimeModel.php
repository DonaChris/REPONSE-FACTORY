<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LogStaffTimeModel extends Model
{
    use HasFactory;

    protected $table = 'log-staff-time';

    protected $fillable = [
        'total_hour',
        'total_staff',
        'total_amount',
        'observation',
        'operation_date',
        'details'
    ];
}
