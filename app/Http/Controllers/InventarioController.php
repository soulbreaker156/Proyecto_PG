<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Producto;

use function PHPSTORM_META\map;

class InventarioController extends Controller
{
    public function index()
    {
        $imagenes = null;
        $imagenes = Producto::all();
       
        if ($imagenes ) {
            $binario = is_resource($imagenes->first()->imagen_producto)
                ? stream_get_contents($imagenes->first()->imagen_producto)
                : $imagenes->first()->imagen_producto;
            $imagenes = 'data:image/jpeg;base64,' . $binario;
        }
        $productos = Producto::select([
            'id_producto',
            'producto',
            'descripcion',
            'estado',
            'precio',
            'cantidad',
        ])->get();

        return Inertia::render('Inventario/Inventario', [
            'productos' => $productos, 'imagenes' => $imagenes,
        ]);
    }
}
