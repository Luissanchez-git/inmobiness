<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CiudadesSeeder extends Seeder
{
    public function run(): void
    {
        // Colonias reference ciudades; clear child rows first to avoid FK violations.
        DB::table('colonias')->delete();
        DB::table('ciudades')->delete();

        $data = json_decode(file_get_contents(__DIR__.'/data/estados_municipios.json'), true);

        $rows = [];
        foreach ($data['estados'] as $estado) {
            $estadoId = DB::table('estados')->where('nombre', $estado['nombre'])->value('id');

            foreach ($estado['municipios'] as $municipio) {
                $rows[] = [
                    'estado_id' => $estadoId,
                    'nombre' => $municipio['nombre'],
                    'codigo_postal' => $municipio['codigo_postal'] ?? null,
                    'activo' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        DB::table('ciudades')->insert($rows);
    }
}
