<?php

namespace App\Http\Controllers;

use App\Models\KategoriPengeluaran;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\QueryException;

class KategoriPengeluaranController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        $kategoriPengeluarans = KategoriPengeluaran::query()
            ->when($search, function ($query) use ($search) {
                $query->where(
                    'nama_kategori',
                    'ilike',
                    "%{$search}%"
                );
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('kategori-pengeluaran/index', [
            'kategoriPengeluarans' => $kategoriPengeluarans,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render(
            'kategori-pengeluaran/create'
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_kategori' => [
                'required',
                'string',
                'max:255',
                'unique:kategori_pengeluarans,nama_kategori',
            ],
        ]);

        KategoriPengeluaran::create($validated);

        return redirect()
            ->route('kategori-pengeluarans.index')
            ->with(
                'success',
                'Kategori pengeluaran berhasil ditambahkan.'
            );
    }

    public function edit(
        KategoriPengeluaran $kategoriPengeluaran
    ) {
        return Inertia::render(
            'kategori-pengeluaran/edit',
            [
                'kategoriPengeluaran' =>
                $kategoriPengeluaran,
            ]
        );
    }

    public function update(
        Request $request,
        KategoriPengeluaran $kategoriPengeluaran
    ) {
        $validated = $request->validate([
            'nama_kategori' => [
                'required',
                'string',
                'max:255',
                'unique:kategori_pengeluarans,nama_kategori,' .
                    $kategoriPengeluaran->id,
            ],
        ]);

        $kategoriPengeluaran->update($validated);

        return redirect()
            ->route('kategori-pengeluarans.index')
            ->with(
                'success',
                'Kategori pengeluaran berhasil diperbarui.'
            );
    }

    public function destroy(KategoriPengeluaran $kategoriPengeluaran)
    {
        try {

            $kategoriPengeluaran->delete();

            return back()->with(
                'success',
                'Kategori pengeluaran berhasil dihapus.'
            );
        } catch (QueryException $e) {

            if ($e->getCode() === '23503') {
                return back()->with(
                    'error',
                    'Kategori pengeluaran tidak dapat dihapus karena masih digunakan pada data pengeluaran.'
                );
            }
        }
    }
}
