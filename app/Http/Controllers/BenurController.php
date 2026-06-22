<?php

namespace App\Http\Controllers;

use App\Models\Benur;
use Illuminate\Http\Request;
use App\Models\Kolam;
use Inertia\Inertia;

class BenurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search;

        $benurs = Benur::with('kolam')
            ->when($search, function ($query) use ($search) {
                $query->whereHas('kolam', function ($q) use ($search) {
                    $q->where('kode_kolam', 'ilike', "%{$search}%")
                        ->orWhere('nama_kolam', 'ilike', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('benur/index', [
            'benurs' => $benurs,
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
        return Inertia::render('benur/create', [
            'kolams' => Kolam::orderBy('nama_kolam')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kolam_id' => ['required', 'exists:kolams,id'],
            'tanggal_tebar' => ['required', 'date'],
            'jumlah_benur' => ['required', 'integer', 'min:1'],
            'harga_per_ekor' => ['nullable', 'numeric', 'min:0'],
            'keterangan' => ['nullable', 'string'],
        ]);

        $validated['total_biaya'] =
            ($validated['jumlah_benur'] ?? 0) *
            ($validated['harga_per_ekor'] ?? 0);

        Benur::create($validated);

        return redirect()
            ->route('benurs.index')
            ->with('success', 'Data benur berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function edit(Benur $benur)
    {
        return Inertia::render('benur/edit', [
            'benur' => $benur,
            'kolams' => Kolam::orderBy('nama_kolam')->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function update(Request $request, Benur $benur)
    {
        $validated = $request->validate([
            'kolam_id' => ['required', 'exists:kolams,id'],
            'tanggal_tebar' => ['required', 'date'],
            'jumlah_benur' => ['required', 'integer', 'min:1'],
            'harga_per_ekor' => ['nullable', 'numeric', 'min:0'],
            'keterangan' => ['nullable', 'string'],
        ]);

        $validated['total_biaya'] =
            ($validated['jumlah_benur'] ?? 0) *
            ($validated['harga_per_ekor'] ?? 0);

        $benur->update($validated);

        return redirect()
            ->route('benurs.index')
            ->with('success', 'Data benur berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Benur $benur)
    {
        $benur->delete();

        return redirect()
            ->route('benurs.index')
            ->with('success', 'Data benur berhasil dihapus');
    }
}
