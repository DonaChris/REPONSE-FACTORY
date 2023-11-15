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
            $table->time('hour_work');
            $table->longText('observations')->nullable()->default(null);

            $table->unsignedBigInteger('staff');
            $table->foreign('staff')->references('id')->on('staff');

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
