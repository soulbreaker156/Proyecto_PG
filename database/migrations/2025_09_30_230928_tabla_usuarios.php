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
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id('id_usuario');
            $table->string('usuario', 100);
            $table->string('password', 255);
            $table->bigInteger('nit')->unique();
            $table->string('direccion',200)->nullable();
            $table->unsignedBigInteger('fk_id_rol');
            $table->foreign('fk_id_rol')->references('id_rol')->on('roles')->onDelete('cascade');
            $table->timestamps();
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
