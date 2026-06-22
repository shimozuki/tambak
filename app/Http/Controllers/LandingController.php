<?php

namespace App\Http\Controllers;

use App\Models\Kolam;
use App\Models\Pemasukan;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        $totalKolam = Kolam::count();

        $totalPanen = Pemasukan::sum('berat_panen');

        $panenTerbaru = Pemasukan::with('kolam')
            ->latest('tanggal_panen')
            ->take(6)
            ->get();

        return Inertia::render('landing/index', [
            'stats' => [
                'total_kolam' => $totalKolam,
                'total_panen' => $totalPanen,
            ],

            'panenTerbaru' => $panenTerbaru,
        ]);
    }

    public function hasilPanen()
    {
        $panens = Pemasukan::with('kolam')
            ->latest('tanggal_panen')
            ->paginate(10);

        return Inertia::render('landing/hasil-panen', [
            'panens' => $panens,
        ]);
    }

    public function stokUdang()
    {
        $stokUdang = Pemasukan::with('kolam')
            ->latest('tanggal_panen')
            ->paginate(10);

        return Inertia::render('landing/stok-udang', [
            'stokUdang' => $stokUdang,
        ]);
    }

    public function tentang()
    {
        return Inertia::render('landing/tentang');
    }
}
