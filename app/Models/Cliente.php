<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $table = 'clientes';
    protected $primaryKey = 'id_cliente';
    public $timestamps = true;

    protected $fillable = [
        'nombre',
        'apellido',
        'dpi',
    ];
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    // Relación con el modelo Credito
    public function creditos()
    {
        return $this->hasMany(Credito::class, 'fk_id_cliente', 'id_cliente');
    }
}
