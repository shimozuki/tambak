<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('panens', function (Blueprint $table) {

            $table->dropColumn([
                'harga_per_kg',
                'total_pemasukan',
            ]);
        });
    }

    public function down(): void
    {
        Schema::table('panens', function (Blueprint $table) {

            $table->decimal(
                'harga_per_kg',
                15,
                2
            );

            $table->decimal(
                'total_pemasukan',
                15,
                2
            );
        });
    }
};
