<?php

namespace App\Http\Controllers;

use App\Models\Municipio;

class MunicipiosController extends Controller
{
    /**
     * Display the colonias that belong to the given municipio.
     */
    public function colonias(string $id)
    {
        $municipio = Municipio::with('colonias')->find($id);

        if (!$municipio) {
            return response()->json([
                'message' => 'Municipio no encontrado',
            ], 404);
        }

        return response()->json([
            'data' => $municipio->colonias,
        ]);
    }
}
