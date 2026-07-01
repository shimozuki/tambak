<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Panen extends Model
{
    use HasFactory;

    protected $fillable = [
        'kolam_id',
        'tanggal_panen',
        'berat_panen',
        'size',
    ];

    protected $casts = [
        'tanggal_panen' => 'date',
        'berat_panen' => 'decimal:2',
    ];

    public function kolam()
    {
        return $this->belongsTo(Kolam::class);
    }
}
