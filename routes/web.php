<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\DashboardController;
use App\Http\Middleware\AccesoPagina;
use App\Http\Controllers\InventarioController;
Route::get('/', function () {
    return Inertia::render('Login/Login');
})->name('home');

Route::get('/SinAcceso', function () {
    return Inertia::render('SinAcceso/SinAcceso');
})->name('sinacceso');

//Rutas de autenticación
Route::post('/login', [LoginController::class, 'iniciarSesion'])->name('login');
Route::get('/logout', [LoginController::class, 'cerrarSesion'])->name('logout');

//Rutas protegidas por el middleware AccesoPagina para que solo usuarios autenticados puedan acceder
Route::middleware([AccesoPagina::class])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/inventario', [InventarioController::class, 'index'])->name('inventario');
    Route::get('/inventario/editar', [InventarioController::class, 'editar'])->name('inventario.editar');
});
