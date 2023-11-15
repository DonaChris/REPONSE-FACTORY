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
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('surname');
            $table->string('email')->nullable()->default(null);
            $table->string('IFU')->nullable()->default(null);
            $table->string('phone');
            $table->dateTime('birthDate')->nullable()->default(null);

            $table->unsignedBigInteger('staff_type');
            $table->foreign('staff_type')->references('id')->on('staff-type');
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
        Schema::dropIfExists('staff');
    }
};
