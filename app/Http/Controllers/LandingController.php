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
}
