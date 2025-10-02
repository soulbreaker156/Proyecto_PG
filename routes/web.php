<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LoginController;

Route::get('/', function () {
    return Inertia::render('Login/Login');
})->name('home');

Route::post('/login', [LoginController::class, 'iniciarSesion'])->name('login');
