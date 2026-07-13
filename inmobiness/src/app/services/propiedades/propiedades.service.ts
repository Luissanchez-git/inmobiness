import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Propiedad, PropiedadImagen } from '../../shared/mock-data/propiedad.model';
import { PROPIEDADES_MOCK } from '../../shared/mock-data/propiedades.mock';

const STORAGE_KEY = 'inmobiness_mock_propiedades';

/**
 * Servicio 100% local: no llama al backend. Las propiedades viven en
 * localStorage (sembradas la primera vez desde PROPIEDADES_MOCK), así que
 * las que se den de alta desde el panel persisten entre recargas del navegador.
 */
@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {

  private read(): Propiedad[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      this.write(PROPIEDADES_MOCK);
      return [...PROPIEDADES_MOCK];
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [...PROPIEDADES_MOCK];
    }
  }

  private write(propiedades: Propiedad[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(propiedades));
  }

  private nextId(propiedades: Propiedad[]): number {
    return propiedades.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  }

  getAll() {
    return of({ data: this.read() });
  }

  show(id: number) {
    const propiedad = this.read().find(p => p.id === id) ?? null;
    return of({ data: propiedad, success: !!propiedad });
  }

  search(filters: { estado?: string; municipio?: string; colonia?: string; operacion?: string; tipo?: string }) {
    let data = this.read();
    if (filters.estado) data = data.filter(p => p.estado === filters.estado);
    if (filters.municipio) data = data.filter(p => p.municipio === filters.municipio);
    if (filters.colonia) data = data.filter(p => p.colonia === filters.colonia);
    if (filters.operacion) data = data.filter(p => p.operacion === filters.operacion);
    if (filters.tipo) data = data.filter(p => p.tipo === filters.tipo);
    return of({ data });
  }

  addPropiedad(formData: FormData) {
    const propiedades = this.read();
    const get = (key: string) => (formData.get(key) as string) ?? null;
    const getNum = (key: string) => {
      const v = get(key);
      return v !== null && v !== '' ? Number(v) : null;
    };

    const imagenes: PropiedadImagen[] = formData.getAll('imagenes[]')
      .filter((f): f is File => f instanceof File)
      .map((file, i) => ({ id: i + 1, imagen: URL.createObjectURL(file), orden: i }));

    const propiedad: Propiedad = {
      id: this.nextId(propiedades),
      nombre: get('nombre') ?? '',
      descripcion: get('descripcion'),
      tipo: get('tipo') ?? '',
      operacion: (get('operacion') as 'Venta' | 'Renta') ?? 'Venta',
      estado: get('estado') ?? '',
      municipio: get('municipio') ?? '',
      colonia: get('colonia') ?? '',
      calle: get('calle'),
      numero: get('numero'),
      precio: getNum('precio') ?? 0,
      moneda: get('moneda') ?? 'MXN',
      recamaras: getNum('recamaras'),
      banos: getNum('banos'),
      estacionamiento: getNum('estacionamiento'),
      m2_construccion: getNum('m2_construccion'),
      m2_terreno: getNum('m2_terreno'),
      antiguedad: getNum('antiguedad'),
      niveles: getNum('niveles'),
      precio_m2: getNum('precio_m2'),
      estado_publicacion: (get('estado_publicacion') as any) ?? 'Activa',
      id_user: getNum('id_user'),
      imagenes,
    };

    propiedades.push(propiedad);
    this.write(propiedades);

    return of({ data: propiedad, status: 'success', message: 'Propiedad creada exitosamente' });
  }

  updatePropiedad(id: number, data: Partial<Propiedad>) {
    const propiedades = this.read();
    const index = propiedades.findIndex(p => p.id === id);
    if (index === -1) {
      return of({ message: 'Propiedad no encontrada' });
    }
    propiedades[index] = { ...propiedades[index], ...data };
    this.write(propiedades);
    return of({ message: 'Propiedad actualizada exitosamente', data: propiedades[index] });
  }

  removePropiedad(id: number) {
    const propiedades = this.read().filter(p => p.id !== id);
    this.write(propiedades);
    return of({ message: 'Propiedad eliminada exitosamente' });
  }
}
