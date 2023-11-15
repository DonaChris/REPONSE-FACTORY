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
        Schema::create('log-raw-material', function (Blueprint $table) {
            $table->id();
            $table->longText('product');

            $table->unsignedBigInteger('production');
            $table->foreign('production')->references('id')->on('production');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('log-raw-material');
    }
};
