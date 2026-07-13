<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('propiedades', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->string('tipo');
            $table->string('operacion');

            // Ubicación
            $table->string('estado');
            $table->string('municipio');
            $table->string('colonia');
            $table->string('calle')->nullable();
            $table->string('numero')->nullable();

            // Precio
            $table->decimal('precio', 14, 2);
            $table->string('moneda', 3)->default('MXN');

            // Características
            $table->unsignedInteger('recamaras')->nullable();
            $table->unsignedInteger('banos')->nullable();
            $table->unsignedInteger('estacionamiento')->nullable();
            $table->decimal('m2_construccion', 10, 2)->nullable();
            $table->decimal('m2_terreno', 10, 2)->nullable();
            $table->unsignedInteger('antiguedad')->nullable();
            $table->unsignedInteger('niveles')->nullable();
            $table->decimal('precio_m2', 14, 2)->nullable();

            // Publicación
            $table->string('estado_publicacion')->default('Activa');

            $table->unsignedBigInteger('id_user')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('propiedades');
    }
};
