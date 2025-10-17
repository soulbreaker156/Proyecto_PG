<?php

namespace App\Http\Controllers;

use App\Models\Credito;
use Inertia\Inertia;
use App\Models\Cliente;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CreditoController extends Controller
{
    function index()
    {
        $usuarios = Usuario::with('creditos')->whereHas('creditos')->get();
        $clientes = Cliente::with('creditos')->whereHas('creditos')->get();
        return Inertia::render('Creditos/Creditos', [
            'usuarios' => $usuarios,
            'clientes' => $clientes,
        ]);
    }
    function detalles(Request $request)
    {
        try {
            $usuarioId = $request->input('usuarioId');
            $clienteId = $request->input('clienteId');

            if ($usuarioId) {
                $usuario = Usuario::with('creditos')->findOrFail($usuarioId);
                return Inertia::render('DetallesCreditos/DetallesCreditos', [
                    'usuario' => $usuario,
                    'cliente' => null,
                ]);
            } else if ($clienteId) {
                $cliente = Cliente::with('creditos')->findOrFail($clienteId);
                return Inertia::render('DetallesCreditos/DetallesCreditos', [
                    'usuario' => null,
                    'cliente' => $cliente,
                ]);
            }
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Error al obtener los detalles']);
        }
    }
    function agregarCredito()
    {
        $usuarios = Usuario::all();
        $clientes = Cliente::all();
        return Inertia::render('AgregarCredito/AgregarCredito', [
            'usuarios' => $usuarios,
            'clientes' => $clientes,
        ]);
    }
    function guardarCredito(Request $request)
    {
        $data = $request->validate([
            'usuario_id' => 'nullable|exists:usuarios,id_usuario',
            'cliente_id' => 'nullable|exists:clientes,id_cliente',
            'monto' => 'required|numeric|min:0.01',
            'descripcion' => 'required|string|max:100',
        ], [
            'usuario_id.exists' => 'El usuario seleccionado no es válido.',
            'cliente_id.exists' => 'El cliente seleccionado no es válido.',
            'monto.required' => 'El monto es obligatorio.',
            'monto.numeric' => 'El monto debe ser un número válido.',
            'monto.min' => 'El monto debe ser al menos 0.01.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'descripcion.string' => 'La descripción debe ser una cadena de texto.',
            'descripcion.max' => 'La descripción no debe exceder los 100 caracteres.',
        ]);

        try {
            DB::beginTransaction();
            if (!$data['usuario_id']) {
                $credito = new Credito();
                $credito->tipo_mov = 'credito';
                $credito->monto = $data['monto'];
                $credito->descripcion = $data['descripcion'];
                $credito->fecha_mov = now();
                $credito->fk_id_cliente = $data['cliente_id'];
                $credito->save();
            } else {
                $credito = new Credito();
                $credito->tipo_mov = 'credito';
                $credito->monto = $data['monto'];
                $credito->descripcion = $data['descripcion'];
                $credito->fecha_mov = now();
                $credito->fk_id_usuario = $data['usuario_id'];
                $credito->save();
            }
            DB::commit();
            return redirect()->back()->with(['flash' => [
                'title' => 'Éxito',
                'icon' => 'success',
                'message' => 'Crédito creado exitosamente.',
            ]]);
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with(['flash' => [
                'title' => 'Error',
                'icon' => 'error',
                'message' => 'Error al crear el crédito: ' . $e->getMessage(),
            ]]);
        }
    }
    function crearCliente(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:100',
            'apellido' => 'required|string|max:100',
            'dpi' => 'required|numeric|digits_between:1,15|unique:clientes,dpi',
        ], [
            'nombre.required' => 'El nombre es obligatorio.',
            'nombre.string' => 'El nombre debe ser una cadena de texto.',
            'nombre.max' => 'El nombre no debe exceder los 100 caracteres.',
            'apellido.required' => 'El apellido es obligatorio.',
            'apellido.string' => 'El apellido debe ser una cadena de texto.',
            'apellido.max' => 'El apellido no debe exceder los 100 caracteres.',
            'dpi.unique' => 'El DPI ya está registrado.',
            'dpi.required' => 'El DPI es obligatorio.',
            'dpi.numeric' => 'El DPI debe ser un número válido.',
            'dpi.digits_between' => 'El DPI debe tener entre 1 y 15 dígitos.',
        ]);

        try {
            DB::beginTransaction();
            $cliente = new Cliente();
            $cliente->nombre = $data['nombre'];
            $cliente->apellido = $data['apellido'];
            $cliente->dpi = $data['dpi'];
            $cliente->save();
            DB::commit();

            return redirect()->back()->with(['flash' => [
                'title' => 'Éxito',
                'icon' => 'success',
                'message' => 'Cliente creado exitosamente.',
            ]]);
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with(['flash' => [
                'title' => 'Error',
                'icon' => 'error',
                'message' => 'Error al crear el cliente: ' . $e->getMessage(),
            ]]);
        }
    }
}
