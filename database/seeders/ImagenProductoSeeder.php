<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ImagenProducto;

class ImagenProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ImagenProducto::create([
            'imagen_producto' => base64_encode(file_get_contents(public_path('/assets/productos/lapiz.png'))),
        ]);
    }
}
