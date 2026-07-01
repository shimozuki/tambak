<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AsetBiologis extends Model
{
    use HasFactory;

    protected $table = 'aset_biologis';

    protected $fillable = [
        'kolam_id',
        'tanggal_penilaian',
        'jumlah_benur',
        'survival_rate',
        'jumlah_udang_hidup',
        'size_udang',
        'total_berat',
        'harga_pasar',
        'nilai_wajar',
        'stok_publik_kg',
    ];

    protected $casts = [
        'survival_rate' => 'decimal:2',

        'size_udang' => 'integer',

        'total_berat' => 'decimal:2',

        'harga_pasar' => 'decimal:2',

        'nilai_wajar' => 'decimal:2',
    ];

    public function kolam()
    {
        return $this->belongsTo(Kolam::class);
    }
}
