<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffTypeModel extends Model
{
    use HasFactory;

    protected $table = 'staff-type';

    protected $fillable = [
        'label'
    ];
}
