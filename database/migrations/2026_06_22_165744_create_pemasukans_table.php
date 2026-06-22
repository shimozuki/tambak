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
        Schema::create('pemasukans', function (Blueprint $table) {
            $table->id();


            $table->foreignId('kolam_id')
                ->constrained('kolams');

            $table->date('tanggal_panen');

            $table->decimal('berat_panen', 10, 2);

            $table->integer('size');

            $table->decimal('harga_per_kg', 15, 2);

            $table->decimal('total_pemasukan', 15, 2);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemasukans');
    }
};
