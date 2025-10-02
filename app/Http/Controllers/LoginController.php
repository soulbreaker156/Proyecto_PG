<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function iniciarSesion(Request $request)
    {
        $credentials = $request->validate([
            'usuario' => 'required|max:50',
            'password' => 'required|min:2',
        ]);
        try {
            //Intentar autenticar al usuario
            if (Auth::attempt([
                'usuario' => $credentials['usuario'],
                'password' => $credentials['password'],
            ])) {
                $request->session()->regenerate(); // Cambia el ID de sesión
                return Inertia::render('Login/Login')->with('flash', [
                    'title' => 'Éxito',
                    'icon' => 'success',
                    'message' => 'login exitoso'
                ]);
            }
            // Si la autenticación falla
        } catch (\Exception $e) {
            return Inertia::render('Login/Login')->with('flash', [
                'title' => 'Error',
                'icon' => 'error',
                'message' => 'Error al iniciar sesión: ' . $e->getMessage()
            ]);
        }
    }
    public function cerrarSesion(Request $request)
    {
        //Cerrar sesión
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('home');
    }
}
