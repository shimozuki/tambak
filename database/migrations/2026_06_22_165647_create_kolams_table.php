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
        Schema::create('kolams', function (Blueprint $table) {
            $table->id();


            $table->string('kode_kolam')->unique();
            $table->string('nama_kolam');

            $table->enum('jenis_kolam', [
                'ternak',
                'tandon'
            ]);

            $table->enum('status_kolam', [
                'aktif',
                'panen',
                'kosong'
            ])->default('aktif');

            $table->text('keterangan')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kolams');
    }
};
