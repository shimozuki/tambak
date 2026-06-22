<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pemasukan extends Model
{
    use HasFactory;

    protected $fillable = [
        'kolam_id',
        'tanggal_panen',
        'berat_panen',
        'size',
        'harga_per_kg',
        'total_pemasukan',
    ];

    protected $casts = [
        'tanggal_panen' => 'date',
        'berat_panen' => 'decimal:2',
        'harga_per_kg' => 'decimal:2',
        'total_pemasukan' => 'decimal:2',
    ];

    public function kolam()
    {
        return $this->belongsTo(Kolam::class);
    }
}
