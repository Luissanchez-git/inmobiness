<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstadosSeeder extends Seeder
{
    public function run(): void
    {
        $data = json_decode(file_get_contents(__DIR__.'/data/estados_municipios.json'), true);

        foreach ($data['estados'] as $estado) {
            DB::table('estados')->updateOrInsert(
                ['nombre' => $estado['nombre']],
                [
                    'codigo' => $estado['codigo'],
                    'activo' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }
}
