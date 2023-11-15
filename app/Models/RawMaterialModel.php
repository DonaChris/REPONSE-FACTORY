<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RawMaterialModel extends Model
{
    use HasFactory;

    protected $table = 'raw-material';

    protected $fillable = [
        'product',
        'production'
    ];

    public function getProduction() {
        $this->belongsTo(ProductionModel::class, 'production', 'id');
    }
}
