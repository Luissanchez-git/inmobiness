<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ColoniasSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('colonias')->delete();

        $data = json_decode(file_get_contents(__DIR__.'/data/colonias.json'), true);

        foreach ($data['estados'] as $estado) {
            $estadoId = DB::table('estados')->where('nombre', $estado['nombre'])->value('id');

            if (!$estadoId) {
                continue;
            }

            $municipioIds = DB::table('ciudades')
                ->where('estado_id', $estadoId)
                ->pluck('id', 'nombre');

            $rows = [];
            foreach ($estado['municipios'] as $municipioNombre => $colonias) {
                $municipioId = $municipioIds[$municipioNombre] ?? null;

                if (!$municipioId) {
                    continue;
                }

                foreach ($colonias as $colonia) {
                    $rows[] = [
                        'id_municipio' => $municipioId,
                        'nombre' => $colonia['nombre'],
                        'tipo' => $colonia['tipo'] ?? null,
                        'codigo_postal' => $colonia['codigo_postal'] ?? null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];

                    if (count($rows) >= 500) {
                        DB::table('colonias')->insert($rows);
                        $rows = [];
                    }
                }
            }

            if ($rows) {
                DB::table('colonias')->insert($rows);
            }
        }
    }
}
