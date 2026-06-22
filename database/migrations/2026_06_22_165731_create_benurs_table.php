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
        Schema::create('benurs', function (Blueprint $table) {
            $table->id();


            $table->foreignId('kolam_id')
                ->constrained('kolams')
                ->cascadeOnDelete();

            $table->date('tanggal_tebar');

            $table->integer('jumlah_benur');

            $table->decimal('harga_per_ekor', 15, 2)
                ->nullable();

            $table->decimal('total_biaya', 15, 2)
                ->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('benurs');
    }
};
