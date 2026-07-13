<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PropiedadesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('propiedades')->delete();

        $propiedades = [
            [
                'nombre' => 'Casa Residencial Zona Centro',
                'descripcion' => 'Amplia casa de dos niveles a unos pasos de la Zona Centro de Chihuahua, con acabados de lujo y cochera para dos autos.',
                'tipo' => 'Casa', 'operacion' => 'Venta',
                'estado' => 'Chihuahua', 'municipio' => 'Chihuahua', 'colonia' => 'Zona Centro',
                'precio' => 1850000, 'moneda' => 'MXN',
                'recamaras' => 3, 'banos' => 2, 'estacionamiento' => 2,
                'm2_construccion' => 180, 'm2_terreno' => 220, 'antiguedad' => 5, 'niveles' => 2,
            ],
            [
                'nombre' => 'Departamento Campestre Residencial',
                'descripcion' => 'Departamento moderno en fraccionamiento Campestre Residencial, ideal para parejas o profesionistas.',
                'tipo' => 'Departamento', 'operacion' => 'Renta',
                'estado' => 'Chihuahua', 'municipio' => 'Chihuahua', 'colonia' => 'Campestre Residencial I',
                'precio' => 9500, 'moneda' => 'MXN',
                'recamaras' => 2, 'banos' => 1, 'estacionamiento' => 1,
                'm2_construccion' => 85, 'niveles' => 1,
            ],
            [
                'nombre' => 'Casa en Bosques del Valle',
                'descripcion' => 'Casa nueva en privada dentro de Bosques del Valle, Juárez, con seguridad 24 horas.',
                'tipo' => 'Casa', 'operacion' => 'Venta',
                'estado' => 'Chihuahua', 'municipio' => 'Juárez', 'colonia' => 'Bosques del Valle',
                'precio' => 2350000, 'moneda' => 'MXN',
                'recamaras' => 4, 'banos' => 3, 'estacionamiento' => 2,
                'm2_construccion' => 240, 'm2_terreno' => 260, 'antiguedad' => 1, 'niveles' => 2,
            ],
            [
                'nombre' => 'Departamento en Renta Zona Centro Juárez',
                'descripcion' => 'Céntrico y bien ubicado, a unos minutos de plazas comerciales y oficinas.',
                'tipo' => 'Departamento', 'operacion' => 'Renta',
                'estado' => 'Chihuahua', 'municipio' => 'Juárez', 'colonia' => 'Centro',
                'precio' => 7800, 'moneda' => 'MXN',
                'recamaras' => 2, 'banos' => 1, 'estacionamiento' => 1,
                'm2_construccion' => 70, 'niveles' => 1,
            ],
            [
                'nombre' => 'Casa Familiar Ciudad Delicias Centro',
                'descripcion' => 'Casa amplia con patio y jardín en el corazón de Delicias.',
                'tipo' => 'Casa', 'operacion' => 'Venta',
                'estado' => 'Chihuahua', 'municipio' => 'Delicias', 'colonia' => 'Ciudad Delicias Centro',
                'precio' => 1450000, 'moneda' => 'MXN',
                'recamaras' => 3, 'banos' => 2, 'estacionamiento' => 2,
                'm2_construccion' => 160, 'm2_terreno' => 200, 'antiguedad' => 10, 'niveles' => 1,
            ],
            [
                'nombre' => 'Terreno Residencial los Trigales',
                'descripcion' => 'Terreno plano listo para construir en Cuauhtémoc, excelente ubicación.',
                'tipo' => 'Terreno', 'operacion' => 'Venta',
                'estado' => 'Chihuahua', 'municipio' => 'Cuauhtémoc', 'colonia' => 'Residencial los Trigales',
                'precio' => 480000, 'moneda' => 'MXN',
                'm2_terreno' => 500,
            ],
            [
                'nombre' => 'Bodega Industrial Cuauhtémoc',
                'descripcion' => 'Nave industrial con oficinas y andén de carga, ideal para logística.',
                'tipo' => 'Bodega', 'operacion' => 'Renta',
                'estado' => 'Chihuahua', 'municipio' => 'Cuauhtémoc', 'colonia' => 'Ciudad Cuauhtémoc Centro',
                'precio' => 28000, 'moneda' => 'MXN',
                'm2_construccion' => 900, 'm2_terreno' => 1200, 'niveles' => 1,
            ],
            [
                'nombre' => 'Departamento Centro Culiacán',
                'descripcion' => 'Departamento remodelado en el Centro de Culiacán, cerca de todo.',
                'tipo' => 'Departamento', 'operacion' => 'Venta',
                'estado' => 'Sinaloa', 'municipio' => 'Culiacán', 'colonia' => 'Centro',
                'precio' => 1150000, 'moneda' => 'MXN',
                'recamaras' => 2, 'banos' => 2, 'estacionamiento' => 1,
                'm2_construccion' => 95, 'niveles' => 1,
            ],
            [
                'nombre' => 'Casa en Privada Campestre Tres Ríos',
                'descripcion' => 'Casa de lujo en privada con alberca y áreas verdes comunes.',
                'tipo' => 'Casa', 'operacion' => 'Venta',
                'estado' => 'Sinaloa', 'municipio' => 'Culiacán', 'colonia' => 'Campestre Tres Ríos',
                'precio' => 3200000, 'moneda' => 'MXN',
                'recamaras' => 4, 'banos' => 4, 'estacionamiento' => 3,
                'm2_construccion' => 320, 'm2_terreno' => 350, 'antiguedad' => 2, 'niveles' => 2,
            ],
            [
                'nombre' => 'Departamento Vista al Mar Sábalo Country Club',
                'descripcion' => 'Departamento con vista al mar en la exclusiva zona de Sábalo Country Club, Mazatlán.',
                'tipo' => 'Departamento', 'operacion' => 'Venta',
                'estado' => 'Sinaloa', 'municipio' => 'Mazatlán', 'colonia' => 'Sábalo Country Club',
                'precio' => 4200000, 'moneda' => 'MXN',
                'recamaras' => 3, 'banos' => 2, 'estacionamiento' => 2,
                'm2_construccion' => 150, 'niveles' => 1,
            ],
            [
                'nombre' => 'Casa en Renta Centro Mazatlán',
                'descripcion' => 'Casa clásica cerca del malecón y del centro histórico de Mazatlán.',
                'tipo' => 'Casa', 'operacion' => 'Renta',
                'estado' => 'Sinaloa', 'municipio' => 'Mazatlán', 'colonia' => 'Centro',
                'precio' => 14000, 'moneda' => 'MXN',
                'recamaras' => 3, 'banos' => 2, 'estacionamiento' => 1,
                'm2_construccion' => 170, 'm2_terreno' => 200, 'antiguedad' => 30, 'niveles' => 1,
            ],
            [
                'nombre' => 'Casa Primer Cuadro Los Mochis',
                'descripcion' => 'Casa céntrica en el Primer Cuadro (Centro) de Los Mochis, a pasos de todo.',
                'tipo' => 'Casa', 'operacion' => 'Venta',
                'estado' => 'Sinaloa', 'municipio' => 'Ahome', 'colonia' => 'Primer Cuadro (Centro)',
                'precio' => 1050000, 'moneda' => 'MXN',
                'recamaras' => 3, 'banos' => 2, 'estacionamiento' => 2,
                'm2_construccion' => 165, 'm2_terreno' => 190, 'antiguedad' => 15, 'niveles' => 1,
            ],
            [
                'nombre' => 'Terreno Comercial Centro Guasave',
                'descripcion' => 'Terreno con excelente ubicación sobre vialidad principal en Guasave.',
                'tipo' => 'Terreno', 'operacion' => 'Venta',
                'estado' => 'Sinaloa', 'municipio' => 'Guasave', 'colonia' => 'Centro',
                'precio' => 890000, 'moneda' => 'MXN',
                'm2_terreno' => 600,
            ],
            [
                'nombre' => 'Rancho Ganadero en Badiraguato',
                'descripcion' => 'Rancho con pozo propio, corrales y amplia extensión para ganado.',
                'tipo' => 'Rancho', 'operacion' => 'Venta',
                'estado' => 'Sinaloa', 'municipio' => 'Badiraguato', 'colonia' => 'Centro',
                'precio' => 2600000, 'moneda' => 'MXN',
                'm2_terreno' => 50000,
            ],
        ];

        $rows = [];
        foreach ($propiedades as $p) {
            $rows[] = array_merge([
                'descripcion' => null, 'calle' => null, 'numero' => null,
                'recamaras' => null, 'banos' => null, 'estacionamiento' => null,
                'm2_construccion' => null, 'm2_terreno' => null, 'antiguedad' => null,
                'niveles' => null, 'precio_m2' => null,
                'estado_publicacion' => 'Activa', 'id_user' => null,
                'created_at' => now(), 'updated_at' => now(),
            ], $p);
        }

        DB::table('propiedades')->insert($rows);
    }
}
