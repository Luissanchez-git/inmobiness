<?php

namespace App\Http\Controllers;

use App\Models\Propiedad;
use App\Models\PropiedadImagen;
use Illuminate\Http\Request;

class PropiedadesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Propiedad::with(['user', 'imagenes'])->latest();

        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        if ($request->filled('municipio')) {
            $query->where('municipio', $request->municipio);
        }

        if ($request->filled('colonia')) {
            $query->where('colonia', $request->colonia);
        }

        if ($request->filled('operacion')) {
            $query->where('operacion', $request->operacion);
        }

        if ($request->filled('tipo')) {
            $query->where('tipo', $request->tipo);
        }

        return response()->json([
            'data' => $query->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|min:3|max:150',
            'descripcion' => 'nullable|string',
            'tipo' => 'required|string|max:50',
            'operacion' => 'required|string|max:20',

            'estado' => 'required|string|max:100',
            'municipio' => 'required|string|max:100',
            'colonia' => 'required|string|max:150',
            'calle' => 'nullable|string|max:150',
            'numero' => 'nullable|string|max:20',

            'precio' => 'required|numeric|min:1',
            'moneda' => 'nullable|string|max:3',

            'recamaras' => 'nullable|integer|min:0',
            'banos' => 'nullable|integer|min:0',
            'estacionamiento' => 'nullable|integer|min:0',
            'm2_construccion' => 'nullable|numeric|min:0',
            'm2_terreno' => 'nullable|numeric|min:0',
            'antiguedad' => 'nullable|integer|min:0',
            'niveles' => 'nullable|integer|min:0',
            'precio_m2' => 'nullable|numeric|min:0',

            'estado_publicacion' => 'nullable|string|max:20',
            'id_user' => 'nullable|integer|exists:users,id',

            'imagenes' => 'nullable|array',
            'imagenes.*' => 'file|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $propiedad = Propiedad::create([
            'nombre' => $validated['nombre'],
            'descripcion' => $validated['descripcion'] ?? null,
            'tipo' => $validated['tipo'],
            'operacion' => $validated['operacion'],
            'estado' => $validated['estado'],
            'municipio' => $validated['municipio'],
            'colonia' => $validated['colonia'],
            'calle' => $validated['calle'] ?? null,
            'numero' => $validated['numero'] ?? null,
            'precio' => $validated['precio'],
            'moneda' => $validated['moneda'] ?? 'MXN',
            'recamaras' => $validated['recamaras'] ?? null,
            'banos' => $validated['banos'] ?? null,
            'estacionamiento' => $validated['estacionamiento'] ?? null,
            'm2_construccion' => $validated['m2_construccion'] ?? null,
            'm2_terreno' => $validated['m2_terreno'] ?? null,
            'antiguedad' => $validated['antiguedad'] ?? null,
            'niveles' => $validated['niveles'] ?? null,
            'precio_m2' => $validated['precio_m2'] ?? null,
            'estado_publicacion' => $validated['estado_publicacion'] ?? 'Activa',
            'id_user' => $validated['id_user'] ?? null,
        ]);

        if ($request->hasFile('imagenes')) {
            $destinationPath = public_path('api/propiedad_imagenes');
            foreach ($request->file('imagenes') as $index => $imagen) {
                $name = time() . '_' . $index . '.' . $imagen->getClientOriginalExtension();
                $imagen->move($destinationPath, $name);

                PropiedadImagen::create([
                    'id_propiedad' => $propiedad->id,
                    'imagen' => $name,
                    'orden' => $index,
                ]);
            }
        }

        return response()->json([
            'data' => $propiedad->load('imagenes'),
            'status' => 'success',
            'message' => 'Propiedad creada exitosamente',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $datos = Propiedad::with(['user', 'imagenes'])->where('id', $id)->first();
        return response()->json([
            'data' => $datos,
            'success' => !is_null($datos),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $propiedad = Propiedad::find($id);

        if (!$propiedad) {
            return response()->json([
                'message' => 'Propiedad no encontrada',
            ], 404);
        }

        $validated = $request->validate([
            'nombre' => 'required|string|min:3|max:150',
            'descripcion' => 'nullable|string',
            'tipo' => 'required|string|max:50',
            'operacion' => 'required|string|max:20',

            'estado' => 'required|string|max:100',
            'municipio' => 'required|string|max:100',
            'colonia' => 'required|string|max:150',
            'calle' => 'nullable|string|max:150',
            'numero' => 'nullable|string|max:20',

            'precio' => 'required|numeric|min:1',
            'moneda' => 'nullable|string|max:3',

            'recamaras' => 'nullable|integer|min:0',
            'banos' => 'nullable|integer|min:0',
            'estacionamiento' => 'nullable|integer|min:0',
            'm2_construccion' => 'nullable|numeric|min:0',
            'm2_terreno' => 'nullable|numeric|min:0',
            'antiguedad' => 'nullable|integer|min:0',
            'niveles' => 'nullable|integer|min:0',
            'precio_m2' => 'nullable|numeric|min:0',

            'estado_publicacion' => 'nullable|string|max:20',
            'id_user' => 'nullable|integer|exists:users,id',
        ]);

        $propiedad->update($validated);

        return response()->json([
            'message' => 'Propiedad actualizada exitosamente',
            'data' => $propiedad,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $propiedad = Propiedad::with('imagenes')->find($id);

        if (!$propiedad) {
            return response()->json([
                'message' => 'Propiedad no encontrada',
            ], 404);
        }

        foreach ($propiedad->imagenes as $imagen) {
            $path = public_path('api/propiedad_imagenes') . '/' . $imagen->imagen;
            if (file_exists($path)) {
                unlink($path);
            }
        }

        $propiedad->delete();

        return response()->json([
            'message' => 'Propiedad eliminada exitosamente',
        ], 200);
    }
}
