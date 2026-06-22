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
        Schema::create('pengeluarans', function (Blueprint $table) {
            $table->id();


            $table->foreignId('kategori_id')
                ->constrained('kategori_pengeluarans');

            $table->foreignId('kolam_id')
                ->nullable()
                ->constrained('kolams');

            $table->date('tanggal');

            $table->decimal('jumlah', 15, 2);

            $table->text('keterangan')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengeluarans');
    }
};
