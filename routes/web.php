<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('Login/Login');
})->name('home');

Route::post('/login', [LoginController::class, 'iniciarSesion'])->name('login');
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
