<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionModel extends Model
{
    use HasFactory;

    protected $table = 'production';

    protected $fillable = [
        'name',
        'goal',
        'closed_status',
        'exception_completion_at',
        'closed_at',
        'user'
    ];

    public function getUSer() {
        $this->belongsTo(User::class, 'users', 'id');
    }
}
