<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Credito;
use App\Models\Rol;
use App\Models\Usuario;
use Illuminate\Http\Request;

class CreditoController extends Controller
{
        function index()
        {
            $usuarios = Usuario::with('creditos')->get();
            return Inertia::render('Creditos/Creditos', [
                'usuarios' => $usuarios,
            ]);
        }
        function detalles(Request $request)
        {
            try {
            $usuarioId = $request->input('usuarioId');
            $usuario = Usuario::with('creditos')->findOrFail($usuarioId);
        
        return Inertia::render('DetallesCreditos/DetallesCreditos', [
                'usuario' => $usuario,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener los detalles del crédito'], 500);
        }
    }
}