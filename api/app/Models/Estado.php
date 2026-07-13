<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{
    protected $fillable = [
        'nombre',
        'codigo',
        'activo',
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];

    public function municipios()
    {
        return $this->hasMany(Municipio::class, 'estado_id')->orderBy('nombre');
    }
}
