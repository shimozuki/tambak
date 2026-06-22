<?php

namespace App\Http\Controllers;

use App\Models\Kolam;
use App\Models\Benur;
use App\Models\Pemasukan;
use App\Models\Pengeluaran;
use App\Models\AsetBiologis;
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
            Pemasukan::sum('total_pemasukan');

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
        | NERACA
        |--------------------------------------------------------------------------
        */

        $kas = $labaRugi;

        $asetBiologis =
            AsetBiologis::sum('nilai_wajar');

        $totalAset =
            $kas +
            $asetBiologis;

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
                    $asetBiologis,

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
