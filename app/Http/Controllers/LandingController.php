<?php

namespace App\Http\Controllers;

use App\Models\Kolam;
use App\Models\Pemasukan;
use App\Models\AsetBiologis;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        return Inertia::render('landing/index', [

            'stats' => [
                'total_kolam' => Kolam::count(),

                'total_panen' => Pemasukan::sum(
                    'berat_panen'
                ),

                'nilai_wajar' => AsetBiologis::sum(
                    'nilai_wajar'
                ),
            ],

            'panenTerbaru' => Pemasukan::with('kolam')
                ->latest('tanggal_panen')
                ->take(6)
                ->get(),

        ]);
    }

    public function tentang()
    {
        $totalKolam = Kolam::count();

        $totalProduksi = Pemasukan::sum(
            'berat_panen'
        );

        $totalNilaiWajar =
            AsetBiologis::sum(
                'nilai_wajar'
            );

        return Inertia::render(
            'tentang',
            [
                'data' => [
                    'nama_tambak' =>
                    'Tambak Udang Vaname',

                    'alamat' =>
                    'Sumbawa Besar',

                    'total_kolam' =>
                    $totalKolam,

                    'total_produksi' =>
                    $totalProduksi,

                    'total_nilai_wajar' =>
                    $totalNilaiWajar,
                ]
            ]
        );
    }

    public function hasilPanen()
    {
        $panens = Pemasukan::with('kolam')
            ->latest('tanggal_panen')
            ->paginate(10);

        return Inertia::render(
            'hasil-panen',
            [
                'panens' => $panens,
            ]
        );
    }
}
