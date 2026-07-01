<?php

namespace App\Http\Controllers;

use App\Models\Kolam;
use App\Models\Benur;
use App\Models\Pemasukan;
use App\Models\Pengeluaran;
use App\Models\AsetBiologis;
use App\Models\Penjualan;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        /*
        |--------------------------------------------------------------------------
        | SUMMARY CARD
        |--------------------------------------------------------------------------
        */

        $totalKolam = Kolam::count();

        $totalBenur = Benur::sum('jumlah_benur');

        $totalPemasukan =
            Penjualan::sum(
                'jumlah_penjualan'
            );

        $totalPengeluaran =
            Pengeluaran::sum('jumlah');

        $labaRugi =
            $totalPemasukan -
            $totalPengeluaran;

        /*
        |--------------------------------------------------------------------------
        | PSAK 69 FAIR VALUE
        |--------------------------------------------------------------------------
        */

        $nilaiWajar =
            AsetBiologis::sum('nilai_wajar');

        /*
|--------------------------------------------------------------------------
| NERACA PSAK 69
|--------------------------------------------------------------------------
*/

        $kas =
            $totalPemasukan -
            $totalPengeluaran;

        /*
|--------------------------------------------------------------------------
| ASET BIOLOGIS PER KOLAM
|--------------------------------------------------------------------------
*/

        $asetBiologisPerKolam =
            AsetBiologis::with('kolam')
            ->get()
            ->map(function ($item) {
                return [
                    'kolam' => $item->kolam?->nama_kolam,
                    'nilai_wajar' => $item->nilai_wajar,
                ];
            });

        $totalAsetBiologis =
            $asetBiologisPerKolam
            ->sum('nilai_wajar');

        $totalAset =
            $kas +
            $totalAsetBiologis;

        /*
        |--------------------------------------------------------------------------
        | EKUITAS
        |--------------------------------------------------------------------------
        */

        $modalPemilik =
            $totalAset;

        /*
        |--------------------------------------------------------------------------
        | GRAFIK
        |--------------------------------------------------------------------------
        */

        $grafik = [
            [
                'kategori' => 'Pemasukan',
                'nilai' => $totalPemasukan,
            ],
            [
                'kategori' => 'Pengeluaran',
                'nilai' => $totalPengeluaran,
            ],
            [
                'kategori' => 'Laba',
                'nilai' => $labaRugi,
            ],
            [
                'kategori' => 'Nilai Wajar',
                'nilai' => $nilaiWajar,
            ],
        ];

        /*
        |--------------------------------------------------------------------------
        | FAIR VALUE REPORT
        |--------------------------------------------------------------------------
        */

        $fairValueReport =
            AsetBiologis::with('kolam')
            ->latest('tanggal_penilaian')
            ->get();

        return Inertia::render(
            'dashboard',
            [
                'summary' => [
                    'total_kolam' =>
                    $totalKolam,

                    'total_benur' =>
                    $totalBenur,

                    'total_pemasukan' =>
                    $totalPemasukan,

                    'total_pengeluaran' =>
                    $totalPengeluaran,

                    'laba_rugi' =>
                    $labaRugi,

                    'nilai_wajar' =>
                    $nilaiWajar,
                ],

                'grafik' => $grafik,

                'neraca' => [

                    'kas' => $kas,

                    'aset_biologis' =>
                    $asetBiologisPerKolam,

                    'total_aset_biologis' =>
                    $totalAsetBiologis,

                    'total_aset' =>
                    $totalAset,

                    'modal_pemilik' =>
                    $modalPemilik,
                ],

                'fairValueReport' =>
                $fairValueReport,
            ]
        );
    }
}
