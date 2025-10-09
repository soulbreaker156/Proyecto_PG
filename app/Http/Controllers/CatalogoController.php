<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\ImagenProducto;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class CatalogoController extends Controller
{
    public function index()
    {
        $productos = Producto::select([
            'id_producto',
            'producto',
            'descripcion',
            'precio',
            'cantidad',
            'fk_id_imagen'
        ])
            ->where('estado', 'mostrado')
            ->where('estatus', 'activo')
            ->where('cantidad', '>', 0)
            ->get();

        $imagenes = ImagenProducto::select()->whereIn('id_imagen', $productos->pluck('fk_id_imagen'))->get()->map(function ($img) {
            $binario = is_resource($img->imagen_producto)
                ? stream_get_contents($img->imagen_producto)
                : $img->imagen_producto;
            return [
                'id_imagen' => $img->id_imagen,
                'imagen' => $img->imagen_producto !== null ? 'data:image/jpeg;base64,' . $binario : '/assets/productos/no-hay-imagen.jpg',
            ];
        });

        return Inertia::render('Catalogo/Catalogo', [
            'productos' => $productos,
            'imagenes' => $imagenes,
        ]);
    }
}
