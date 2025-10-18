<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Total extends Model
{
    protected $table = 'totales';
    protected $primaryKey = 'id_total';
    protected $fillable = ['saldo_total', 'deuda_total'];

    // Relación con el modelo Credito
    public function creditos()
    {
        return $this->hasMany(Credito::class, 'fk_id_total', 'id_total');
    }
}
