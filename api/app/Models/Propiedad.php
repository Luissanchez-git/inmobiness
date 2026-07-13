<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Propiedad extends Model
{
    protected $table = 'propiedades';

    protected $fillable = [
        'nombre',
        'descripcion',
        'tipo',
        'operacion',
        'estado',
        'municipio',
        'colonia',
        'calle',
        'numero',
        'precio',
        'moneda',
        'recamaras',
        'banos',
        'estacionamiento',
        'm2_construccion',
        'm2_terreno',
        'antiguedad',
        'niveles',
        'precio_m2',
        'estado_publicacion',
        'id_user',
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'id_user');
    }

    public function imagenes()
    {
        return $this->hasMany(PropiedadImagen::class, 'id_propiedad')->orderBy('orden');
    }
}
