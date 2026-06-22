<?php

namespace App\Http\Controllers;

use App\Models\AsetBiologis;
use Inertia\Inertia;

class FairValueController extends Controller
{
    public function index()
    {
        $data = [];

        $asetBiologis = AsetBiologis::with('kolam')
            ->orderBy('kolam_id')
            ->orderBy('tanggal_penilaian')
            ->get()
            ->groupBy('kolam_id');

        foreach ($asetBiologis as $kolamId => $records) {

            $previous = null;

            foreach ($records as $record) {

                $selisih = 0;

                if ($previous) {
                    $selisih =
                        $record->nilai_wajar -
                        $previous->nilai_wajar;
                }

                $data[] = [
                    'id' => $record->id,

                    'kolam' =>
                    $record->kolam?->nama_kolam,

                    'tanggal_penilaian' =>
                    $record->tanggal_penilaian,

                    'nilai_wajar_lama' =>
                    $previous?->nilai_wajar,

                    'nilai_wajar_baru' =>
                    $record->nilai_wajar,

                    'selisih' =>
                    $selisih,
                ];

                $previous = $record;
            }
        }

        return Inertia::render(
            'laporan/perubahan-nilai-wajar',
            [
                'data' => $data,
            ]
        );
    }
}
