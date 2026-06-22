<?php

namespace App\Http\Controllers;

use App\Models\Kolam;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KolamController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        $kolams = Kolam::query()
            ->when($search, function ($query) use ($search) {
                $query->where('kode_kolam', 'ilike', "%{$search}%")
                    ->orWhere('nama_kolam', 'ilike', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('kolam/index', [
            'kolams' => $kolams,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('kolam/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode_kolam' => ['required', 'string', 'max:50', 'unique:kolams,kode_kolam'],
            'nama_kolam' => ['required', 'string', 'max:255'],
            'jenis_kolam' => ['required', 'in:ternak,tandon'],
            'status_kolam' => ['required', 'in:aktif,kosong,panen'],
            'luas_m2' => ['nullable', 'numeric'],
            'keterangan' => ['nullable', 'string'],
        ]);

        Kolam::create($validated);

        return redirect()
            ->route('kolams.index')
            ->with('success', 'Data kolam berhasil ditambahkan');
    }

    public function edit(Kolam $kolam)
    {
        return Inertia::render('kolam/edit', [
            'kolam' => $kolam,
        ]);
    }

    public function update(Request $request, Kolam $kolam)
    {
        $validated = $request->validate([
            'kode_kolam' => [
                'required',
                'string',
                'max:50',
                'unique:kolams,kode_kolam,' . $kolam->id,
            ],
            'nama_kolam' => ['required', 'string', 'max:255'],
            'jenis_kolam' => ['required', 'in:ternak,tandon'],
            'status_kolam' => ['required', 'in:aktif,kosong,panen'],
            'luas_m2' => ['nullable', 'numeric'],
            'keterangan' => ['nullable', 'string'],
        ]);

        $kolam->update($validated);

        return redirect()
            ->route('kolams.index')
            ->with('success', 'Data kolam berhasil diperbarui.');
    }

    public function destroy(Kolam $kolam)
    {
        $kolam->delete();

        return back()->with(
            'success',
            'Data kolam berhasil dihapus.'
        );
    }
}
