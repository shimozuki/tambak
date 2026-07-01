<?php

namespace App\Http\Controllers;

use App\Models\Kolam;
use App\Models\Panen;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PemasukanController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        $pemasukans = Panen::with('kolam')
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

        return Inertia::render(
            'pemasukan/index',
            [
                'pemasukans' => $pemasukans,

                'filters' => [
                    'search' => $search,
                ],
            ]
        );
    }

    public function create()
    {
        return Inertia::render(
            'pemasukan/create',
            [
                'kolams' => Kolam::orderBy(
                    'nama_kolam'
                )->get(),
            ]
        );
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
        ]);

        Panen::create($validated);

        return redirect()
            ->route('pemasukans.index')
            ->with(
                'success',
                'Data panen berhasil ditambahkan.'
            );
    }

    public function edit(Panen $pemasukan)
    {
        return Inertia::render(
            'pemasukan/edit',
            [
                'pemasukan' => $pemasukan,

                'kolams' => Kolam::orderBy(
                    'nama_kolam'
                )->get(),
            ]
        );
    }

    public function update(
        Request $request,
        Panen $pemasukan
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
        ]);

        $pemasukan->update($validated);

        return redirect()
            ->route('pemasukans.index')
            ->with(
                'success',
                'Data panen berhasil diperbarui.'
            );
    }

    public function destroy(Panen $pemasukan)
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
