<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\DashboardController;
use App\Http\Middleware\AccesoPagina;
use App\Http\Controllers\InventarioController;
use App\Http\Controllers\CatalogoController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\CreditoController;
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
    Route::get('/inventario', [InventarioController::class, 'index'])->name('inventario.index');
    Route::get('/inventario/editar', [InventarioController::class, 'editarDatos'])->name('inventario.editar');
    Route::post('/inventario/actualizar', [InventarioController::class, 'actualizar'])->name('inventario.actualizar');
    Route::post('/inventario/eliminar', [InventarioController::class, 'eliminar'])->name('inventario.eliminar');
    Route::post('/inventario/actualizarEstado', [InventarioController::class, 'actualizarEstado'])->name('inventario.actualizarEstado');
    Route::get('/inventario/agregar', [InventarioController::class, 'agregar'])->name('inventario.agregar');
    Route::post('/inventario/guardarProducto', [InventarioController::class, 'guardar'])->name('inventario.guardarProducto');
    Route::get('/catalogo', [CatalogoController::class, 'index'])->name('catalogo.index');
    Route::get('/carrito', function () {return Inertia::render('Carrito/Carrito');})->name('carrito.index');
    Route::post('/pedido/crearPedido', [PedidoController::class, 'crearPedido'])->name('pedido.crearPedido');
    Route::get('/creditos', [CreditoController::class, 'index'])->name('creditos.index');
    Route::get('/creditos/detalles', [CreditoController::class, 'detalles'])->name('creditos.detalles');
    Route::get('/creditos/agregar', [CreditoController::class, 'agregarCredito'])->name('creditos.agregar');
    Route::post('/creditos/guardar', [CreditoController::class, 'guardarCredito'])->name('creditos.guardar');
    Route::post('/creditos/crearCliente', [CreditoController::class, 'crearCliente'])->name('creditos.crearCliente');
    Route::get('/creditos/abonar', [CreditoController::class, 'abonar'])->name('creditos.abonar');
});
