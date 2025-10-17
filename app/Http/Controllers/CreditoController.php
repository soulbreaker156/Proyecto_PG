<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Credito;
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
}
