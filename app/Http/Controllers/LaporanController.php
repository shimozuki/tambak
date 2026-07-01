<?php

namespace App\Http\Controllers;

use App\Models\Pengeluaran;
use App\Models\Pemasukan;
use App\Models\Penjualan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class LaporanController extends Controller
{
    public function index(Request $request)
    {
        $tanggalAwal = $request->tanggal_awal;
        $tanggalAkhir = $request->tanggal_akhir;

        $pemasukan = Penjualan::query()
            ->when(
                $tanggalAwal,
                fn($q) =>
                $q->whereDate(
                    'tanggal_penjualan',
                    '>=',
                    $tanggalAwal
                )
            )
            ->when(
                $tanggalAkhir,
                fn($q) =>
                $q->whereDate(
                    'tanggal_penjualan',
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
            ->sum('jumlah_penjualan');

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
                    ->latest('tanggal_penjualan')
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

        $pemasukan = Penjualan::query()
            ->when(
                $tanggalAwal,
                fn($q) =>
                $q->whereDate(
                    'tanggal_penjualan',
                    '>=',
                    $tanggalAwal
                )
            )
            ->when(
                $tanggalAkhir,
                fn($q) =>
                $q->whereDate(
                    'tanggal_penjualan',
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
            $pemasukan->sum(
                'jumlah_penjualan'
            );

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
