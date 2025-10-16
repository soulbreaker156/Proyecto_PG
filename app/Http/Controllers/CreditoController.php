<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CreditoController extends Controller
{
    function index()
    {
        return Inertia::render('Creditos/Creditos');
    }
}
