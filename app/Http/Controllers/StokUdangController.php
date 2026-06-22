<?php

namespace App\Http\Controllers;

use App\Models\Kolam;
use Inertia\Inertia;

class StokUdangController extends Controller
{
    public function index()
    {
        $data = Kolam::with([
            'benurs',
            'asetBiologis',
        ])->get()
            ->map(function ($kolam) {

                $benur =
                    $kolam->benurs
                    ->sum('jumlah_benur');

                $aset =
                    $kolam->asetBiologis
                    ->sortByDesc(
                        'tanggal_penilaian'
                    )
                    ->first();

                $survivalRate =
                    $aset?->survival_rate ?? 0;

                $udangHidup =
                    $aset?->jumlah_udang_hidup ?? 0;

                return [

                    'id' => $kolam->id,

                    'nama_kolam' =>
                    $kolam->nama_kolam,

                    'benur_tebar' =>
                    $benur,

                    'survival_rate' =>
                    $survivalRate,

                    'udang_hidup' =>
                    $udangHidup,

                    'nilai_wajar' =>
                    $aset?->nilai_wajar ?? 0,
                ];
            });

        return Inertia::render(
            'stok-udang/index',
            [
                'data' => $data,
            ]
        );
    }
}
