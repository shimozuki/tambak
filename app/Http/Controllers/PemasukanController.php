<?php

namespace App\Http\Controllers;

use App\Models\Kolam;
use Inertia\Inertia;
use App\Models\Pemasukan;
use Illuminate\Http\Request;

class PemasukanController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        $pemasukans = Pemasukan::with('kolam')
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

        return Inertia::render('pemasukan/index', [
            'pemasukans' => $pemasukans,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('pemasukan/create', [
            'kolams' => Kolam::orderBy(
                'nama_kolam'
            )->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kolam_id' => [
                'required',
                'exists:kolams,id',
            ],

            'tanggal_panen' => [
                'required',
                'date',
            ],

            'berat_panen' => [
                'required',
                'numeric',
                'min:0',
            ],

            'size' => [
                'required',
                'integer',
                'min:1',
            ],

            'harga_per_kg' => [
                'required',
                'numeric',
                'min:0',
            ],
        ]);

        $validated['total_pemasukan'] =
            $validated['berat_panen'] *
            $validated['harga_per_kg'];

        Pemasukan::create($validated);

        return redirect()
            ->route('pemasukans.index')
            ->with(
                'success',
                'Data panen berhasil ditambahkan.'
            );
    }

    public function edit(Pemasukan $pemasukan)
    {
        return Inertia::render('pemasukan/edit', [
            'pemasukan' => $pemasukan,

            'kolams' => Kolam::orderBy(
                'nama_kolam'
            )->get(),
        ]);
    }

    public function update(
        Request $request,
        Pemasukan $pemasukan
    ) {
        $validated = $request->validate([
            'kolam_id' => [
                'required',
                'exists:kolams,id',
            ],

            'tanggal_panen' => [
                'required',
                'date',
            ],

            'berat_panen' => [
                'required',
                'numeric',
                'min:0',
            ],

            'size' => [
                'required',
                'integer',
                'min:1',
            ],

            'harga_per_kg' => [
                'required',
                'numeric',
                'min:0',
            ],
        ]);

        $validated['total_pemasukan'] =
            $validated['berat_panen'] *
            $validated['harga_per_kg'];

        $pemasukan->update($validated);

        return redirect()
            ->route('pemasukans.index')
            ->with(
                'success',
                'Data panen berhasil diperbarui.'
            );
    }

    public function destroy(Pemasukan $pemasukan)
    {
        $pemasukan->delete();

        return redirect()
            ->route('pemasukans.index')
            ->with(
                'success',
                'Data panen berhasil dihapus.'
            );
    }
}
