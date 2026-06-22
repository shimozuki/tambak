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
        Schema::table('kolams', function (Blueprint $table) {
            $table->decimal('luas_m2', 10, 2)->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('kolams', function (Blueprint $table) {
            $table->dropColumn('luas_m2');
        });
    }
};
