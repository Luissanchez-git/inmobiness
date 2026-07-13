<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Colonia extends Model
{
    protected $fillable = [
        'id_municipio',
        'nombre',
        'tipo',
        'codigo_postal',
    ];

    public function municipio()
    {
        return $this->belongsTo(Municipio::class, 'id_municipio');
    }
}
