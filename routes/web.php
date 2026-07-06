<?php

use App\Http\Controllers\AsetBiologisController;
use App\Http\Controllers\BenurController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FairValueController;
use App\Http\Controllers\KategoriPengeluaranController;
use App\Http\Controllers\KolamController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\PemasukanController;
use App\Http\Controllers\PengeluaranController;
use App\Http\Controllers\PenjualanController;
use App\Http\Controllers\StokUdangController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get(
    '/',
    [LandingController::class, 'index']
)->name('home');

Route::get(
    '/tentang',
    [LandingController::class, 'tentang']
);

Route::get(
    '/hasil-panen',
    [LandingController::class, 'hasilPanen']
);

Route::get(
    '/stok-udang-public',
    [LandingController::class, 'stokUdang']
);

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get(
        '/dashboard',
        [DashboardController::class, 'index']
    )->name('dashboard');


    Route::resource('kolams', KolamController::class);
    Route::resource('benurs', BenurController::class);
    Route::resource(
        'kategori-pengeluarans',
        KategoriPengeluaranController::class
    );
    Route::resource(
        'pengeluarans',
        PengeluaranController::class
    );

    Route::resource(
        'pemasukans',
        PemasukanController::class
    );

    Route::resource(
        'aset-biologis',
        AsetBiologisController::class
    );

    Route::resource(
        'penjualans',
        PenjualanController::class
    );

    Route::get(
        '/laporan',
        [LaporanController::class, 'index']
    )->name('laporan.index');

    Route::get(
        '/laporan/export-pdf',
        [LaporanController::class, 'exportPdf']
    )->name('laporan.export-pdf');

    Route::get(
        '/laporan/perubahan-nilai-wajar',
        [FairValueController::class, 'index']
    )->name('laporan.perubahan-nilai-wajar');

    Route::get(
        '/stok-udang',
        [StokUdangController::class, 'index']
    );

    Route::resource(
        'users',
        UserController::class
    );
});




require __DIR__ . '/settings.php';
