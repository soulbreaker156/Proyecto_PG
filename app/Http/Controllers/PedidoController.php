<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PedidoController extends Controller
{
    function crearPedido(Request $request)
    {
        $productos = $request->input('productos');
        dd($productos); // Verifica que los datos se reciban correctamente
        // Aquí puedes procesar los datos recibidos, por ejemplo, guardarlos en la base de datos
        // foreach ($productos as $producto) {
        //     // Lógica para guardar cada producto
        // }
     
    }
}
