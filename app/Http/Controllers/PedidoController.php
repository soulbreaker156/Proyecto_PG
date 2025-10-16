<?php

namespace App\Http\Controllers;
use App\Models\Pedido;
use App\Models\Producto;
use App\Models\PedidoProducto;
use App\Models\Usuario;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PedidoController extends Controller
{
    function crearPedido(Request $request)
    {
        //Guarda en una variable los datos del productos enviados desde el frontend
        $productos = $request->input('productos');
        //Obtiene el id del usuario autenticado
        $usuario = Auth::user()->id_usuario;

        DB::beginTransaction();
        try {
            $pedido = new Pedido();
            $pedido->fk_id_usuario = $usuario;
            $pedido->estado = 'pendiente';
            $pedido->save();

            foreach ($productos as $item){
                $pedidoProducto = new PedidoProducto();
                $pedidoProducto->fk_id_pedido = $pedido->id_pedido;
                $pedidoProducto->fk_id_producto = $item['id_producto'];
                $pedidoProducto->cantidad = $item['cantidad'];
                $pedidoProducto->total = $item['total'];
                $pedidoProducto->save();

                $producto = Producto::find($item['id_producto']);
                if ($producto) {
                    $producto->cantidad -= $item['cantidad'];
                    $producto->save();
                }
            }
            DB::commit();
            return redirect()->route('carrito.index')->with(['flash' => [
                'icon' => 'success',
                'title' => 'Pedido enviado',
                'message' => 'Su pedido ha sido creado exitosamente.',
            ]]);
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('carrito.index')->with(['flash' => [
                'icon' => 'error',
                'title' => 'No se pudo crear el pedido',
                'message' => 'Ocurrió un error al procesar su pedido. Por favor, intente nuevamente.',
            ]]);
        }
    }
}
