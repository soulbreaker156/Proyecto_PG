<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Cliente;
use App\Models\Usuario;
use Illuminate\Http\Request;

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
    function agregarCredito(Request $request)
    {
        return Inertia::render('AgregarCredito/AgregarCredito');
    }
}
