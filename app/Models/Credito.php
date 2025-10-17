<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Credito extends Model
{
    protected $table = 'creditos';
    protected $primaryKey = 'id_credito';
    public $timestamps = true;

    protected $fillable = [
        'tipo_mov',
        'monto',
        'descripcion',
        'fecha_mov',
        'fk_id_usuario',
    ];


    // Relación con el modelo Usuario
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'fk_id_usuario', 'id_usuario');
    }
}
