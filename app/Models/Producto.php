<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = 'productos';
    protected $primaryKey = 'id_producto';
    protected $fillable = [
        'producto', 
        'descripcion', 
        'estado',
        'precio',
        'cantidad',
        'fk_id_imagen', 
    ];

    // Un producto puede estar en muchos pedidos
    public function pedidos()
    {
        return $this->belongsToMany(Pedido::class, 'pedidos_productos', 'fk_id_producto', 'fk_id_pedido')
                    ->withPivot('cantidad', 'fecha_creado');
    }
    // Relación con el modelo ImagenProducto
    public function imagenes()
    {
        return $this->belongsTo(ImagenProducto::class, 'fk_id_imagen', 'id_imagen');
    }
}

    
