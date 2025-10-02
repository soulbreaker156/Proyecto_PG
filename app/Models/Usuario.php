<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Usuario extends Authenticatable
{
    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';
    public $timestamps = true;

    protected $fillable = [
        'usuario',
        'password',
        'nit',
        'direccion',
        'fk_id_rol',
    ];
    protected $hidden = [
        'contrasena',
    ];

    // Relación con el modelo Rol
    public function rol()
    {
        return $this->hasMany(Rol::class, 'fk_id_rol', 'id_rol');
    }
    // Relación con el modelo Credito
    public function creditos()
    {
        return $this->hasMany(Credito::class, 'fk_id_usuario', 'id_usuario');
    }

    // Relación con el modelo Pedido
    public function pedidos()
    {
        return $this->hasMany(Pedido::class, 'fk_id_usuario', 'id_usuario');
    }

    // Relación con el modelo Proforma
    public function proformas()
    {
        return $this->hasMany(Proforma::class, 'fk_id_usuario', 'id_usuario');
    }
}
