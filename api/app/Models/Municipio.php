<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Municipio extends Model
{
    protected $table = 'ciudades';

    protected $fillable = [
        'estado_id',
        'nombre',
        'codigo_postal',
        'activo',
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];

    public function estado()
    {
        return $this->belongsTo(Estado::class, 'estado_id');
    }

    public function colonias()
    {
        return $this->hasMany(Colonia::class, 'id_municipio')->orderBy('nombre');
    }
}
