<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kolam extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode_kolam',
        'nama_kolam',
        'jenis_kolam',
        'status_kolam',
        'luas_m2',
        'keterangan',
    ];

    protected $casts = [
        'luas_m2' => 'decimal:2',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relations
    |--------------------------------------------------------------------------
    */

    public function benurs()
    {
        return $this->hasMany(Benur::class);
    }

    public function pengeluarans()
    {
        return $this->hasMany(Pengeluaran::class);
    }

    public function panens()
    {
        return $this->hasMany(Panen::class);
    }

    public function asetBiologis()
    {
        return $this->hasMany(AsetBiologis::class);
    }

    public function penjualans()
    {
        return $this->hasMany(Penjualan::class);
    }
}
