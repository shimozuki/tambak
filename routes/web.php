<?php

use App\Http\Controllers\AsetBiologisController;
use App\Http\Controllers\BenurController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KategoriPengeluaranController;
use App\Http\Controllers\KolamController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\PemasukanController;
use App\Http\Controllers\PengeluaranController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get(
    '/',
    [LandingController::class, 'index']
)->name('home');

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

    Route::get(
        '/laporan',
        [LaporanController::class, 'index']
    )->name('laporan.index');
});

require __DIR__ . '/settings.php';
