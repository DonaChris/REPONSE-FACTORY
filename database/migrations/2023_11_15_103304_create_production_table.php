<?php

use App\Helpers\StatusHelpers;
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
        Schema::create('production', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('goal');
            $table->enum('closed_status',[StatusHelpers::ACTIF,StatusHelpers::INACTIF])->default(StatusHelpers::INACTIF);
            $table->dateTime('exception_completion_at');
            $table->dateTime('closed_at')->nullable()->default(null);

            $table->unsignedBigInteger('user');
            $table->foreign('user')->references("id")->on('users');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('production');
    }
};
