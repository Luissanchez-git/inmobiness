<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropiedadImagen extends Model
{
    protected $table = 'propiedad_imagenes';

    protected $fillable = [
        'id_propiedad',
        'imagen',
        'orden',
    ];

    public function propiedad()
    {
        return $this->belongsTo(Propiedad::class, 'id_propiedad');
    }
}
