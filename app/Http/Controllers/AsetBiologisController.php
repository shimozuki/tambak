<?php

namespace App\Http\Controllers;

use App\Models\Kolam;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\AsetBiologis;

class AsetBiologisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search;

        $asetBiologis = AsetBiologis::with('kolam')
            ->when($search, function ($query) use ($search) {
                $query->whereHas('kolam', function ($q) use ($search) {
                    $q->where(
                        'nama_kolam',
                        'ilike',
                        "%{$search}%"
                    );
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('aset-biologis/index', [
            'asetBiologis' => $asetBiologis,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('aset-biologis/create', [
            'kolams' => Kolam::orderBy(
                'nama_kolam'
            )->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kolam_id' => [
                'required',
                'exists:kolams,id',
            ],

            'tanggal_penilaian' => [
                'required',
                'date',
            ],

            'jumlah_benur' => [
                'required',
                'integer',
                'min:1',
            ],

            'survival_rate' => [
                'required',
                'numeric',
                'min:0',
                'max:100',
            ],

            'size_udang' => [
                'required',
                'integer',
                'min:1',
            ],

            'harga_pasar' => [
                'required',
                'numeric',
                'min:0',
            ],
        ]);

        $jumlahUdangHidup =
            $validated['jumlah_benur'] *
            ($validated['survival_rate'] / 100);

        $totalBerat =
            $jumlahUdangHidup /
            $validated['size_udang'];

        $nilaiWajar =
            $totalBerat *
            $validated['harga_pasar'];

        AsetBiologis::create([
            'kolam_id' => $validated['kolam_id'],
            'tanggal_penilaian' => $validated['tanggal_penilaian'],
            'jumlah_benur' => $validated['jumlah_benur'],
            'survival_rate' => $validated['survival_rate'],
            'jumlah_udang_hidup' => round($jumlahUdangHidup),
            'size_udang' => $validated['size_udang'],
            'total_berat' => $totalBerat,
            'harga_pasar' => $validated['harga_pasar'],
            'nilai_wajar' => $nilaiWajar,
        ]);

        return redirect()
            ->route('aset-biologis.index')
            ->with(
                'success',
                'Aset biologis berhasil ditambahkan.'
            );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(
        AsetBiologis $asetBiologi
    ) {
        return Inertia::render(
            'aset-biologis/edit',
            [
                'asetBiologi' => $asetBiologi,

                'kolams' => Kolam::all(),
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        Request $request,
        AsetBiologis $asetBiologi
    ) {
        $validated = $request->validate([
            'kolam_id' => [
                'required',
                'exists:kolams,id',
            ],

            'tanggal_penilaian' => [
                'required',
                'date',
            ],

            'jumlah_benur' => [
                'required',
                'integer',
                'min:1',
            ],

            'survival_rate' => [
                'required',
                'numeric',
                'min:0',
                'max:100',
            ],

            'size_udang' => [
                'required',
                'integer',
                'min:1',
            ],

            'harga_pasar' => [
                'required',
                'numeric',
                'min:0',
            ],
        ]);

        $jumlahUdangHidup =
            $validated['jumlah_benur'] *
            ($validated['survival_rate'] / 100);

        $totalBerat =
            $jumlahUdangHidup /
            $validated['size_udang'];

        $nilaiWajar =
            $totalBerat *
            $validated['harga_pasar'];

        $asetBiologi->update([
            'kolam_id' => $validated['kolam_id'],
            'tanggal_penilaian' => $validated['tanggal_penilaian'],
            'jumlah_benur' => $validated['jumlah_benur'],
            'survival_rate' => $validated['survival_rate'],
            'jumlah_udang_hidup' => round($jumlahUdangHidup),
            'size_udang' => $validated['size_udang'],
            'total_berat' => $totalBerat,
            'harga_pasar' => $validated['harga_pasar'],
            'nilai_wajar' => $nilaiWajar,
        ]);

        return redirect()
            ->route('aset-biologis.index')
            ->with(
                'success',
                'Aset biologis berhasil diperbarui.'
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AsetBiologis $asetBiologi)
    {
        $asetBiologi->delete();

        return redirect()
            ->route('aset-biologis.index')
            ->with(
                'success',
                'Aset biologis berhasil dihapus.'
            );
    }
}
