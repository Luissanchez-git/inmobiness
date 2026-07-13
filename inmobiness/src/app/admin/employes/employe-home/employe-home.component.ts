import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

type TipoPropiedad = 'Casa' | 'Departamento' | 'Terreno' | 'Bodega' | 'Granja' | 'Rancho' | 'Otro';

interface Metrics {
  matches:     number;
  likes:       number;
  compartidas: number;
  vistas:      number;
}

interface MiPropiedad {
  id:                 number;
  nombre:             string;
  tipo:               TipoPropiedad;
  estado:             string;
  colonia:            string;
  precio:             number;
  operacion:          'Venta' | 'Renta';
  estado_publicacion: 'Activa' | 'Pendiente' | 'Inactiva';
  fecha_publicacion:  Date;
  metrics:            Metrics;
}

interface Usuario {
  nombre:   string;
  apellido: string;
  correo:   string;
}

interface TotalStats {
  propiedades: number;
  matches:     number;
  likes:       number;
  compartidas: number;
}

// Estructura del formulario del modal
interface NuevaPropiedadForm {
  nombre:             string;
  tipo:               TipoPropiedad | '';
  operacion:          'Venta' | 'Renta' | '';
  colonia:            string;
  estado:             string;
  precio:             number | null;
  estado_publicacion: 'Activa' | 'Pendiente' | 'Inactiva';
}

@Component({
  selector: 'app-employe-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employe-home.component.html',
  styleUrls: ['./employe-home.component.css'],
})
export class EmployeHomeComponent implements OnInit {

  // ── Usuario actual (reemplaza con tu AuthService) ─
  usuario: Usuario = {
    nombre:   'Carlos',
    apellido: 'Mendoza',
    correo:   'carlos@inmobiness.mx',
  };

  // ── Suscriptor (conéctalo a tu AuthService/RolService) ──
  esSuscriptor = true;

  // ── Modal ────────────────────────────────────────
  modalAbierto = false;

  nuevaPropiedad: NuevaPropiedadForm = this.getFormVacio();

  estadosPublicacion: { value: 'Activa' | 'Pendiente' | 'Inactiva'; label: string; activeClass: string }[] = [
    { value: 'Activa',    label: 'Activa',    activeClass: 'bg-emerald-100 border-emerald-300 text-emerald-700' },
    { value: 'Pendiente', label: 'Pendiente', activeClass: 'bg-amber-100 border-amber-300 text-amber-700'       },
    { value: 'Inactiva',  label: 'Inactiva',  activeClass: 'bg-red-100 border-red-300 text-red-600'             },
  ];

  // ── Filtros ──────────────────────────────────────
  searchQuery    = '';
  selectedFiltro = 'todas';
  filteredProperties: MiPropiedad[] = [];

  filtros = [
    { label: 'Todas',     value: 'todas'     },
    { label: 'Activas',   value: 'activas'   },
    { label: 'Venta',     value: 'venta'     },
    { label: 'Renta',     value: 'renta'     },
    { label: 'Pendiente', value: 'pendiente' },
  ];

  // ── Stats globales ───────────────────────────────
  totalStats: TotalStats = { propiedades: 0, matches: 0, likes: 0, compartidas: 0 };

  // ── Mis propiedades (reemplaza con tu servicio) ──
  properties: MiPropiedad[] = [
    {
      id: 1, nombre: 'Casa Residencial Lomas', tipo: 'Casa',
      estado: 'Chihuahua', colonia: 'Lomas de Chapultepec',
      precio: 1850000, operacion: 'Venta', estado_publicacion: 'Activa',
      fecha_publicacion: new Date('2026-01-15'),
      metrics: { matches: 12, likes: 34, compartidas: 8, vistas: 210 },
    },
    {
      id: 2, nombre: 'Departamento Centro Histórico', tipo: 'Departamento',
      estado: 'Chihuahua', colonia: 'Centro',
      precio: 950000, operacion: 'Venta', estado_publicacion: 'Activa',
      fecha_publicacion: new Date('2026-02-03'),
      metrics: { matches: 7, likes: 19, compartidas: 4, vistas: 145 },
    },
    {
      id: 3, nombre: 'Terreno Industrial Norte', tipo: 'Terreno',
      estado: 'Chihuahua', colonia: 'Parque Industrial',
      precio: 480000, operacion: 'Venta', estado_publicacion: 'Pendiente',
      fecha_publicacion: new Date('2026-03-10'),
      metrics: { matches: 2, likes: 5, compartidas: 1, vistas: 48 },
    },
    {
      id: 4, nombre: 'Casa en Renta Delicias', tipo: 'Casa',
      estado: 'Chihuahua', colonia: 'Delicias',
      precio: 380000, operacion: 'Renta', estado_publicacion: 'Activa',
      fecha_publicacion: new Date('2026-01-28'),
      metrics: { matches: 9, likes: 27, compartidas: 6, vistas: 180 },
    },
    {
      id: 5, nombre: 'Rancho El Mezquite', tipo: 'Rancho',
      estado: 'Chihuahua', colonia: 'Periférico',
      precio: 1950000, operacion: 'Venta', estado_publicacion: 'Activa',
      fecha_publicacion: new Date('2025-12-05'),
      metrics: { matches: 4, likes: 11, compartidas: 3, vistas: 92 },
    },
    {
      id: 6, nombre: 'Bodega Zona Norte', tipo: 'Bodega',
      estado: 'Chihuahua', colonia: 'Zona Norte',
      precio: 1200000, operacion: 'Venta', estado_publicacion: 'Inactiva',
      fecha_publicacion: new Date('2025-11-20'),
      metrics: { matches: 0, likes: 3, compartidas: 0, vistas: 22 },
    },
  ];

  ngOnInit(): void {
    this.calcularTotales();
    this.applyFilters();
  }

  // ── Modal ────────────────────────────────────────
  private getFormVacio(): NuevaPropiedadForm {
    return {
      nombre:             '',
      tipo:               '',
      operacion:          '',
      colonia:            '',
      estado:             '',
      precio:             null,
      estado_publicacion: 'Activa',
    };
  }

  abrirModal(): void {
    this.nuevaPropiedad = this.getFormVacio();
    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
  }

  get formularioValido(): boolean {
    return !!(
      this.nuevaPropiedad.nombre.trim() &&
      this.nuevaPropiedad.tipo &&
      this.nuevaPropiedad.operacion
    );
  }

  guardarPropiedad(): void {
    if (!this.formularioValido) return;

    const nuevoId = Math.max(0, ...this.properties.map(p => p.id)) + 1;

    const nueva: MiPropiedad = {
      id:                 nuevoId,
      nombre:             this.nuevaPropiedad.nombre.trim(),
      tipo:               this.nuevaPropiedad.tipo as TipoPropiedad,
      operacion:          this.nuevaPropiedad.operacion as 'Venta' | 'Renta',
      colonia:            this.nuevaPropiedad.colonia.trim() || 'Sin colonia',
      estado:             this.nuevaPropiedad.estado.trim()   || 'Sin estado',
      precio:             this.nuevaPropiedad.precio ?? 0,
      estado_publicacion: this.nuevaPropiedad.estado_publicacion,
      fecha_publicacion:  new Date(),
      metrics:            { matches: 0, likes: 0, compartidas: 0, vistas: 0 },
    };

    this.properties.unshift(nueva);
    this.calcularTotales();
    this.applyFilters();
    this.cerrarModal();
  }

  // ── Filtros ──────────────────────────────────────
  private calcularTotales(): void {
    this.totalStats = {
      propiedades: this.properties.length,
      matches:     this.properties.reduce((s, p) => s + p.metrics.matches, 0),
      likes:       this.properties.reduce((s, p) => s + p.metrics.likes, 0),
      compartidas: this.properties.reduce((s, p) => s + p.metrics.compartidas, 0),
    };
  }

  applyFilters(): void {
    let result = [...this.properties];

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        p.colonia.toLowerCase().includes(q) ||
        p.estado.toLowerCase().includes(q)
      );
    }

    switch (this.selectedFiltro) {
      case 'activas':   result = result.filter(p => p.estado_publicacion === 'Activa');   break;
      case 'venta':     result = result.filter(p => p.operacion === 'Venta');             break;
      case 'renta':     result = result.filter(p => p.operacion === 'Renta');             break;
      case 'pendiente': result = result.filter(p => p.estado_publicacion === 'Pendiente'); break;
    }

    this.filteredProperties = result;
  }

  // ── Helpers ──────────────────────────────────────
  getInitials(): string {
    return `${this.usuario.nombre.charAt(0)}${this.usuario.apellido.charAt(0)}`.toUpperCase();
  }

  getTipoIcon(tipo: TipoPropiedad): string {
    const map: Record<TipoPropiedad, string> = {
      Casa: '🏠', Departamento: '🏢', Terreno: '🌿',
      Bodega: '🏭', Granja: '🌾', Rancho: '🐄', Otro: '🏗️',
    };
    return map[tipo] ?? '🏠';
  }

  /** Engagement = (matches*3 + likes + compartidas*2) / vistas * 100, cap 100 */
  getEngagement(prop: MiPropiedad): number {
    if (!prop.metrics.vistas) return 0;
    const score = (prop.metrics.matches * 3 + prop.metrics.likes + prop.metrics.compartidas * 2);
    return Math.min(100, Math.round((score / prop.metrics.vistas) * 100));
  }
}
