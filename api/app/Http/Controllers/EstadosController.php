<?php

namespace App\Http\Controllers;

use App\Models\Estado;

class EstadosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $datos = Estado::where('activo', true)->orderBy('nombre')->get();
        return response()->json([
            'data' => $datos,
        ]);
    }

    /**
     * Display the municipios that belong to the given estado.
     */
    public function municipios(string $id)
    {
        $estado = Estado::with('municipios')->find($id);

        if (!$estado) {
            return response()->json([
                'message' => 'Estado no encontrado',
            ], 404);
        }

        return response()->json([
            'data' => $estado->municipios,
        ]);
    }
}
