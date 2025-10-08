<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Producto;
use App\Models\ImagenProducto;
use Illuminate\Support\Facades\DB;


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
            'estatus',
            'precio',
            'cantidad',
            'fk_id_imagen',
        ])->where('estatus', 'activo')->get();

        return Inertia::render('Inventario/Inventario', [
            'productos' => $productos,
            'imagenes' => $imagenes,
        ]);
    }
    public function editarDatos(Request $request)
    {
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
    public function actualizar(Request $request)
    {
        $datos = $request->validate([
            'id' => 'required|integer',
            'producto' => 'required|string|max:100',
            'descripcion' => 'nullable|string|max:255',
            'precio' => 'required|numeric',
            'cantidad' => 'required|integer',
            'imagen' => 'nullable|image|max:2048',
        ]);

        try {
            DB::beginTransaction();

            $producto = Producto::find($datos['id']);

            // Actualiza la imagen solo si se envía una nueva
            if ($request->hasFile('imagen')) {
                $archivo = $request->file('imagen');
                $nuevaImagen = base64_encode(file_get_contents($archivo->getRealPath()));
                $guardarImagen = ImagenProducto::find($producto->fk_id_imagen);
                $guardarImagen->imagen_producto = $nuevaImagen;
                $guardarImagen->save();
            }

            Producto::where('id_producto', $datos['id'])->update([
                'producto' => $datos['producto'],
                'descripcion' => $datos['descripcion'],
                'precio' => (float)$datos['precio'],
                'cantidad' => (int)$datos['cantidad'],
            ]);

            DB::commit();
            return redirect()->route('inventario.index')->with('flash', [
                'title' => 'Actualización exitosa',
                'message' => 'El producto se ha actualizado correctamente.',
                'icon' => 'success'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('inventario.index')->with('flash', [
                'title' => 'Error',
                'message' => 'Hubo un problema al actualizar el producto.',
                'icon' => 'error'
            ]);
        }
    }
    public function eliminar(Request $request)
    {
        $id = $request->input('id');
        $producto = Producto::find($id);
        try {
            DB::beginTransaction();
            if ($producto) {
                $producto->estatus = 'inactivo';
                $producto->save();
                DB::commit();
                return redirect()->route('inventario.index')->with('flash', [
                    'title' => 'Eliminación exitosa',
                    'message' => 'El producto se ha eliminado correctamente.',
                    'icon' => 'success'
                ]);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('inventario.index')->with('flash', [
                'title' => 'Error',
                'message' => 'Hubo un problema al eliminar el producto.',
                'icon' => 'error'
            ]);
        }
    }
    public function actualizarEstado(Request $request)
    {
        $id = $request->input('id');
        $producto = Producto::find($id);
        try {
            DB::beginTransaction();
            if ($producto) {
                $producto->estado = ($producto->estado === 'mostrado') ? 'oculto' : 'mostrado';
                $producto->save();
                DB::commit();
                return redirect()->route('inventario.index')->with('flash', [
                    'title' => 'Actualización de estado exitosa',
                    'message' => 'El estado del producto se ha actualizado correctamente.',
                    'icon' => 'success'
                ]);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('inventario.index')->with('flash', [
                'title' => 'Error',
                'message' => 'error:'. $e->getMessage(),
                'icon' => 'error'
            ]);
        }
    }
    public function agregar()
    {
        return Inertia::render('AgregarProducto/AgregarProducto');
    }
    public function guardar(Request $request)
    {
        $datos = $request->validate([
            'producto' => 'required|string|max:100',
            'descripcion' => 'nullable|string|max:255',
            'precio' => 'required|numeric',
            'cantidad' => 'required|integer',
            'imagen' => 'nullable|image|max:2048',      
        ]);

        try{
            DB::beginTransaction();

            $nuevaImagen = null;
            if ($request->hasFile('imagen')){
                $archivo = $request->file('imagen');
                $nuevaImagen = base64_encode(file_get_contents($archivo->getRealPath()));
            }
            $imagen=ImagenProducto::create([
                'imagen_producto' => $nuevaImagen,
            ]);
            Producto::create([
                'producto' => $datos['producto'],
                'descripcion' => $datos['descripcion'],
                'precio' => (float)$datos['precio'],
                'cantidad' => (int)$datos['cantidad'],
                'estado' => 'mostrado',
                'estatus' => 'activo',
                'fk_id_imagen' => $imagen->id_imagen,
            ]);
            DB::commit();
            return redirect()->route('inventario.index')->with('flash', [
                'title' => 'Producto agregado',
                'message' => 'El producto se ha agregado correctamente.',
                'icon' => 'success'
            ]);

        }catch(\Exception $e){
            DB::rollBack();
            return redirect()->route('inventario.index')->with('flash', [
                'title' => 'Error',
                'message' => 'error:'. $e->getMessage(),
                'icon' => 'error'
            ]);
        }
    }
}
