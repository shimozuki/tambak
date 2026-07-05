<?php

namespace App\Http\Controllers;

use App\Models\Kolam;
use App\Models\Pemasukan;
use App\Models\AsetBiologis;
use App\Models\Panen;
use App\Models\Penjualan;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        return Inertia::render('landing/index', [

            'stats' => [
                'total_kolam' => Kolam::count(),

                'total_panen' => Panen::sum(
                    'berat_panen'
                ),

                'nilai_wajar' => AsetBiologis::sum(
                    'nilai_wajar'
                ),
            ],

            'panenTerbaru' => Panen::with('kolam')
                ->latest('tanggal_panen')
                ->take(6)
                ->get(),

        ]);
    }

    public function tentang()
    {
        $totalKolam = Kolam::count();

        $totalProduksi = Panen::sum(
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
        $panens = Panen::with('kolam')
            ->latest('tanggal_panen')
            ->paginate(10);

        return Inertia::render(
            'hasil-panen',
            [
                'panens' => $panens,
            ]
        );
    }

    public function stokUdang()
    {
        $totalPanen =
            Panen::sum('berat_panen');

        $totalTerjual =
            Penjualan::sum('berat_kg');

        $stokTersedia =
            max(
                $totalPanen - $totalTerjual,
                0
            );

        return Inertia::render(
            'stok-udang-public',
            [
                'totalPanen' => $totalPanen,
                'totalTerjual' => $totalTerjual,
                'stokTersedia' => $stokTersedia,
            ]
        );
    }
}
