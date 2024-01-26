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
        Schema::create('log-staff-time', function (Blueprint $table) {
            $table->id();

            $table->integer('total_hour')->default(0);
            $table->integer('total_staff')->default(0);
            $table->integer('total_amount')->default(0);
            $table->longText('observation')->nullable()->default(null);
            $table->date('operation_date');
            $table->json('details');

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
        Schema::dropIfExists('log-staff-time');
    }
};
