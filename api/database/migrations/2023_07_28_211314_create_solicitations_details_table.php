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
        Schema::create('solicitations_details', function (Blueprint $table) {
	        $table->id();
	        $table->foreignId('solicitation_id')->constrained()->cascadeOnDelete();
	        $table->foreignId('category_id')->constrained();
	        $table->float('value');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solicitations_details');
    }
};
