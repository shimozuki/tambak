<?php

namespace App\Http\Controllers;

use App\Models\Pengeluaran;
use App\Models\Pemasukan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class LaporanController extends Controller
{
    public function index(Request $request)
    {
        $tanggalAwal = $request->tanggal_awal;
        $tanggalAkhir = $request->tanggal_akhir;

        $pemasukan = Pemasukan::query()
            ->when(
                $tanggalAwal,
                fn($q) =>
                $q->whereDate(
                    'tanggal_panen',
                    '>=',
                    $tanggalAwal
                )
            )
            ->when(
                $tanggalAkhir,
                fn($q) =>
                $q->whereDate(
                    'tanggal_panen',
                    '<=',
                    $tanggalAkhir
                )
            );

        $pengeluaran = Pengeluaran::query()
            ->when(
                $tanggalAwal,
                fn($q) =>
                $q->whereDate(
                    'tanggal',
                    '>=',
                    $tanggalAwal
                )
            )
            ->when(
                $tanggalAkhir,
                fn($q) =>
                $q->whereDate(
                    'tanggal',
                    '<=',
                    $tanggalAkhir
                )
            );

        $totalPemasukan =
            (clone $pemasukan)
            ->sum('total_pemasukan');

        $totalPengeluaran =
            (clone $pengeluaran)
            ->sum('jumlah');

        return Inertia::render(
            'laporan/index',
            [
                'summary' => [
                    'pemasukan' =>
                    $totalPemasukan,

                    'pengeluaran' =>
                    $totalPengeluaran,

                    'laba_rugi' =>
                    $totalPemasukan -
                        $totalPengeluaran,
                ],

                'filters' => [
                    'tanggal_awal' =>
                    $tanggalAwal,

                    'tanggal_akhir' =>
                    $tanggalAkhir,
                ],

                'pemasukans' =>
                $pemasukan
                    ->with('kolam')
                    ->latest()
                    ->get(),

                'pengeluarans' =>
                $pengeluaran
                    ->with([
                        'kolam',
                        'kategori',
                    ])
                    ->latest()
                    ->get(),
            ]
        );
    }

    public function exportPdf(Request $request)
    {
        $tanggalAwal = $request->tanggal_awal;
        $tanggalAkhir = $request->tanggal_akhir;

        $pemasukan = Pemasukan::with('kolam')
            ->when(
                $tanggalAwal,
                fn($q) =>
                $q->whereDate(
                    'tanggal_panen',
                    '>=',
                    $tanggalAwal
                )
            )
            ->when(
                $tanggalAkhir,
                fn($q) =>
                $q->whereDate(
                    'tanggal_panen',
                    '<=',
                    $tanggalAkhir
                )
            )
            ->get();

        $pengeluaran = Pengeluaran::with([
            'kolam',
            'kategori',
        ])
            ->when(
                $tanggalAwal,
                fn($q) =>
                $q->whereDate(
                    'tanggal',
                    '>=',
                    $tanggalAwal
                )
            )
            ->when(
                $tanggalAkhir,
                fn($q) =>
                $q->whereDate(
                    'tanggal',
                    '<=',
                    $tanggalAkhir
                )
            )
            ->get();

        $totalPemasukan =
            $pemasukan->sum('total_pemasukan');

        $totalPengeluaran =
            $pengeluaran->sum('jumlah');

        $labaBersih =
            $totalPemasukan -
            $totalPengeluaran;

        $pdf = Pdf::loadView(
            'pdf.laporan-keuangan',
            compact(
                'pemasukan',
                'pengeluaran',
                'totalPemasukan',
                'totalPengeluaran',
                'labaBersih',
                'tanggalAwal',
                'tanggalAkhir'
            )
        );

        return $pdf->download(
            'laporan-keuangan.pdf'
        );
    }
}
