<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Penjualan extends Model
{
    use HasFactory;

    protected $fillable = [
        'tanggal_penjualan',
        'berat_kg',
        'jumlah_penjualan',
        'keterangan',
    ];

    protected $casts = [
        'tanggal_penjualan' => 'date',
        'jumlah_penjualan' => 'decimal:2',
    ];
}
