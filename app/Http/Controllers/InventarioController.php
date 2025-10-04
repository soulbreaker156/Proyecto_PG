<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Producto;
use App\Models\ImagenProducto;


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
    public function editarDatos(Request $request){
        $id = $request->input('id');
        $imagenes = ImagenProducto::where('id_imagen', $id)->get()->map(function ($img) {
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
            'precio',
            'cantidad',
        ])->where('id_producto', $id)->get();

        return Inertia::render('EditarProducto/EditarProducto', [
            'productos' => $productos,
            'imagenes' => $imagenes,
        ]);
    }
}
