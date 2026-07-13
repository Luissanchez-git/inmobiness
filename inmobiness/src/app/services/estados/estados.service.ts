import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ESTADOS_MOCK } from '../../shared/mock-data/estados.mock';
import { MUNICIPIOS_MOCK } from '../../shared/mock-data/municipios.mock';
import { COLONIAS_MOCK } from '../../shared/mock-data/colonias.mock';

/**
 * Servicio 100% local: no llama al backend. Los datos viven en
 * shared/mock-data/*.mock.ts (misma info que se sembró en el backend
 * con el catálogo oficial de SEPOMEX, curada a un subconjunto ligero).
 */
@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  getAll() {
    return of({ data: ESTADOS_MOCK });
  }

  getMunicipios(estadoId: number) {
    const data = MUNICIPIOS_MOCK.filter(m => m.estado_id === estadoId);
    return of({ data });
  }

  getColonias(municipioId: number) {
    const data = COLONIAS_MOCK.filter(c => c.id_municipio === municipioId);
    return of({ data });
  }
}
