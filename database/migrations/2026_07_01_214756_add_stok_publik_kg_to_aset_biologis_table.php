<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table(
            'aset_biologis',
            function (Blueprint $table) {
                $table->decimal(
                    'stok_publik_kg',
                    12,
                    2
                )
                    ->default(0)
                    ->after('nilai_wajar');
            }
        );
    }

    public function down(): void
    {
        Schema::table(
            'aset_biologis',
            function (Blueprint $table) {
                $table->dropColumn(
                    'stok_publik_kg'
                );
            }
        );
    }
};
