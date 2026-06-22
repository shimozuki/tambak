<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('aset_biologis', function (Blueprint $table) {
            $table->id();


            $table->foreignId('kolam_id')
                ->constrained('kolams');

            $table->date('tanggal_penilaian');

            $table->integer('jumlah_benur');

            $table->decimal('survival_rate', 5, 2);

            $table->integer('jumlah_udang_hidup');

            $table->decimal('berat_rata_rata', 10, 2);

            $table->decimal('total_berat', 15, 2);

            $table->decimal('harga_pasar', 15, 2);

            $table->decimal('nilai_wajar', 15, 2);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aset_biologis');
    }
};
