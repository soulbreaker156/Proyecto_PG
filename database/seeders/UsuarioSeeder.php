<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Usuario::create([
            'usuario' => 'admin',
            'password' => Hash::make('admin123'),
            'nit' => '123456789',
            'direccion' => 'Calle Falsa 123',
            'fk_id_rol' => 1,
        ]);
    }
}
