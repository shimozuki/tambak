<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Benur extends Model
{
    /** @use HasFactory<\Database\Factories\BenurFactory> */
    use HasFactory;

    protected $fillable = [
        'kolam_id',
        'tanggal_tebar',
        'jumlah_benur',
        'harga_per_ekor',
        'total_biaya',
        'keterangan',
    ];

    protected $casts = [
        'tanggal_tebar' => 'date',
        'harga_per_ekor' => 'decimal:2',
        'total_biaya' => 'decimal:2',
    ];

    public function kolam()
    {
        return $this->belongsTo(Kolam::class);
    }
}
