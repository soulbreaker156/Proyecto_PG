<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function iniciarSesion(Request $request)
    {
        $credentials = $request->validate([
            'usuario' => 'required|max:50',
            'password' => 'required|min:2',
        ]);

        // Usar Auth::attempt con las claves correctas
        if (Auth::attempt([
            'usuario' => $credentials['usuario'],
            'password' => $credentials['password'],
        ])) {
            return redirect()->route('home')->with('flash', [
                'title' => 'Éxito',
                'icon' => 'success',
                'message' => 'login exitoso'
            ]);
        }

        return redirect()->route('home')->with('flash', [
            'title' => 'Error',
            'icon' => 'error',
            'message' => 'Credenciales inválidas'
        ]);
    }
}
