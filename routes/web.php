<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\DashboardController;
use App\Http\Middleware\AccesoPagina;

Route::get('/', function () {
    return Inertia::render('Login/Login');
})->name('home');

Route::get('/SinAcceso', function () {
    return Inertia::render('SinAcceso/SinAcceso');
})->name('sinacceso');

Route::post('/login', [LoginController::class, 'iniciarSesion'])->name('login');

//Rutas protegidas por el middleware AccesoPagina para que solo usuarios autenticados puedan acceder
Route::middleware([AccesoPagina::class])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});



