<?php

namespace App\Http\Controllers;

use App\Models\Penjualan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PenjualanController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        $penjualans = Penjualan::query()
            ->when(
                $search,
                fn($query) =>
                $query->where(
                    'keterangan',
                    'ilike',
                    "%{$search}%"
                )
            )
            ->latest('tanggal_penjualan')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render(
            'penjualan/index',
            [
                'penjualans' => $penjualans,

                'filters' => [
                    'search' => $search,
                ],
            ]
        );
    }

    public function create()
    {
        return Inertia::render(
            'penjualan/create'
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tanggal_penjualan' => [
                'required',
                'date',
            ],

            'jumlah_penjualan' => [
                'required',
                'numeric',
                'min:0',
            ],

            'keterangan' => [
                'nullable',
                'string',
            ],
        ]);

        Penjualan::create($validated);

        return redirect()
            ->route('penjualans.index')
            ->with(
                'success',
                'Data penjualan berhasil ditambahkan.'
            );
    }

    public function edit(
        Penjualan $penjualan
    ) {
        return Inertia::render(
            'penjualan/edit',
            [
                'penjualan' => $penjualan,
            ]
        );
    }

    public function update(
        Request $request,
        Penjualan $penjualan
    ) {
        $validated = $request->validate([
            'tanggal_penjualan' => [
                'required',
                'date',
            ],

            'jumlah_penjualan' => [
                'required',
                'numeric',
                'min:0',
            ],

            'keterangan' => [
                'nullable',
                'string',
            ],
        ]);

        $penjualan->update(
            $validated
        );

        return redirect()
            ->route('penjualans.index')
            ->with(
                'success',
                'Data penjualan berhasil diperbarui.'
            );
    }

    public function destroy(
        Penjualan $penjualan
    ) {
        $penjualan->delete();

        return redirect()
            ->route('penjualans.index')
            ->with(
                'success',
                'Data penjualan berhasil dihapus.'
            );
    }
}
