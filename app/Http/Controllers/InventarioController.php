<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Producto;
use App\Models\ImagenProducto;

use function PHPSTORM_META\map;

class InventarioController extends Controller
{
    public function index()
    {
        $imagenes = ImagenProducto::all()->map(function ($img) {
            $binario = is_resource($img->imagen_producto)
                ? stream_get_contents($img->imagen_producto)
                : $img->imagen_producto;
            return [
                'id_imagen' => $img->id_imagen,
                'imagen' => 'data:image/jpeg;base64,' . $binario,
            ];
        });

        $productos = Producto::select([
            'id_producto',
            'producto',
            'descripcion',
            'estado',
            'precio',
            'cantidad',
            'fk_id_imagen',
        ])->get();

        return Inertia::render('Inventario/Inventario', [
            'productos' => $productos,
            'imagenes' => $imagenes,
        ]);
    }
}
