<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Producto;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Producto::create([
            'producto' => 'Lapiz',
            'descripcion' => 'Lapiz de grafito HB',
            'precio' => 0.50,
            'cantidad' => 100,
            'fk_id_imagen' => 1,
        ]);
    }
}
