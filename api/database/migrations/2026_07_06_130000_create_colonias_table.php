<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('colonias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_municipio')
                  ->constrained('ciudades')
                  ->onDelete('cascade');
            $table->string('nombre');
            $table->string('tipo', 50)->nullable();
            $table->string('codigo_postal', 10)->nullable();
            $table->timestamps();

            $table->index(['id_municipio', 'nombre']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('colonias');
    }
};
