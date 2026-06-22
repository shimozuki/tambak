<?php

namespace App\Http\Controllers;

use App\Models\Kolam;
use Inertia\Inertia;
use App\Models\Pengeluaran;
use Illuminate\Http\Request;
use App\Models\KategoriPengeluaran;

class PengeluaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search;

        $pengeluarans = Pengeluaran::with([
            'kategori',
            'kolam',
        ])
            ->when($search, function ($query) use ($search) {
                $query->whereHas('kategori', function ($q) use ($search) {
                    $q->where(
                        'nama_kategori',
                        'ilike',
                        "%{$search}%"
                    );
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('pengeluaran/index', [
            'pengeluarans' => $pengeluarans,
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
        return Inertia::render('pengeluaran/create', [
            'kategoris' => KategoriPengeluaran::orderBy(
                'nama_kategori'
            )->get(),

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
            'kategori_id' => [
                'required',
                'exists:kategori_pengeluarans,id',
            ],

            'kolam_id' => [
                'nullable',
                'exists:kolams,id',
            ],

            'tanggal' => [
                'required',
                'date',
            ],

            'jumlah' => [
                'required',
                'numeric',
                'min:0',
            ],

            'keterangan' => [
                'nullable',
                'string',
            ],
        ]);

        Pengeluaran::create($validated);

        return redirect()
            ->route('pengeluarans.index')
            ->with(
                'success',
                'Pengeluaran berhasil ditambahkan.'
            );
    }

    /**
     * Display the specified resource.
     */
    public function show(Pengeluaran $pengeluaran)
    {
        return response()->json($pengeluaran);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pengeluaran $pengeluaran)
    {
        return Inertia::render('pengeluaran/edit', [
            'pengeluaran' => $pengeluaran,

            'kategoris' => KategoriPengeluaran::orderBy(
                'nama_kategori'
            )->get(),

            'kolams' => Kolam::orderBy(
                'nama_kolam'
            )->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        Request $request,
        Pengeluaran $pengeluaran
    ) {
        $validated = $request->validate([
            'kategori_id' => [
                'required',
                'exists:kategori_pengeluarans,id',
            ],

            'kolam_id' => [
                'nullable',
                'exists:kolams,id',
            ],

            'tanggal' => [
                'required',
                'date',
            ],

            'jumlah' => [
                'required',
                'numeric',
                'min:0',
            ],

            'keterangan' => [
                'nullable',
                'string',
            ],
        ]);

        $pengeluaran->update($validated);

        return redirect()
            ->route('pengeluarans.index')
            ->with(
                'success',
                'Pengeluaran berhasil diperbarui.'
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pengeluaran $pengeluaran)
    {
        $pengeluaran->delete();

        return redirect()
            ->route('pengeluarans.index')
            ->with(
                'success',
                'Pengeluaran berhasil dihapus.'
            );
    }
}
