<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengeluaran extends Model
{
    use HasFactory;

    protected $fillable = [
        'kategori_id',
        'kolam_id',
        'tanggal',
        'jumlah',
        'keterangan',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'jumlah' => 'decimal:2',
    ];

    public function kategori()
    {
        return $this->belongsTo(
            KategoriPengeluaran::class,
            'kategori_id'
        );
    }

    public function kolam()
    {
        return $this->belongsTo(Kolam::class);
    }
}
