import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { RouterLink } from "@angular/router";

export interface Propiedad {
  id: number;
  nombre: string;
  tipo: TipoPropiedad;
  estado: 'Chihuahua' | 'Sinaloa';
  colonia: string;
  precio: number;
  operacion: 'Venta' | 'Renta';
  estado_publicacion: 'Activa' | 'Pendiente' | 'Inactiva';
  recamaras?: number;
  banos?: number;
  m2?: number;
}

export type TipoPropiedad =
  | 'Casa'
  | 'Departamento'
  | 'Terreno'
  | 'Bodega'
  | 'Granja'
  | 'Rancho'
  | 'Otro';

@Component({
  selector: 'app-propiedades',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, CurrencyPipe, RouterLink],
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css'],
})
export class PropiedadesComponent implements OnInit {

  // ── Estado de vista ─────────────────────────────
  viewMode: 'grid' | 'list' = 'grid';

  // ── Filtros activos ──────────────────────────────
  selectedEstado: string | null = null;
  selectedTipo:   string | null = null;
  selectedRango:  string | null = null;
  searchQuery = '';
  selectedSort: any = null;

  // ── Resultados ───────────────────────────────────
  filteredProperties: Propiedad[] = [];

  // ── Catálogos ────────────────────────────────────
  estados = [
    { label: 'Chihuahua', value: 'Chihuahua' },
    { label: 'Sinaloa',   value: 'Sinaloa'   },
  ];

  tiposPropiedad = [
    { label: 'Casa',        value: 'Casa',        icon: '🏠' },
    { label: 'Departamento',value: 'Departamento', icon: '🏢' },
    { label: 'Terreno',     value: 'Terreno',      icon: '🌿' },
    { label: 'Bodega',      value: 'Bodega',       icon: '🏭' },
    { label: 'Granja',      value: 'Granja',       icon: '🌾' },
    { label: 'Rancho',      value: 'Rancho',       icon: '🐄' },
    { label: 'Otro',        value: 'Otro',         icon: '🏗️' },
  ];

  rangosPrecios = [
    { label: '$0 — $500,000',          value: '0-500000',       min: 0,       max: 500000   },
    { label: '$500,000 — $1,000,000',  value: '500000-1000000', min: 500000,  max: 1000000  },
    { label: '$1,000,000 — $2,000,000',value: '1000000-2000000',min: 1000000, max: 2000000  },
  ];

  sortOptions = [
    { label: 'Precio: menor a mayor', value: 'precio_asc'  },
    { label: 'Precio: mayor a menor', value: 'precio_desc' },
    { label: 'Más recientes',         value: 'recientes'   },
    { label: 'Nombre A-Z',            value: 'nombre_asc'  },
  ];

  // ── Datos de ejemplo ─────────────────────────────
  properties: Propiedad[] = [
    { id: 1,  nombre: 'Casa Residencial Lomas',     tipo: 'Casa',         estado: 'Chihuahua', colonia: 'Lomas de Chapultepec', precio: 1850000, operacion: 'Venta',  estado_publicacion: 'Activa',   recamaras: 3, banos: 2, m2: 180 },
    { id: 2,  nombre: 'Departamento Centro Histórico', tipo: 'Departamento', estado: 'Chihuahua', colonia: 'Centro',           precio: 950000,  operacion: 'Venta',  estado_publicacion: 'Activa',   recamaras: 2, banos: 1, m2: 85  },
    { id: 3,  nombre: 'Terreno Industrial Norte',   tipo: 'Terreno',      estado: 'Chihuahua', colonia: 'Parque Industrial',  precio: 480000,  operacion: 'Venta',  estado_publicacion: 'Pendiente',m2: 500 },
    { id: 4,  nombre: 'Bodega Zona Norte',          tipo: 'Bodega',       estado: 'Chihuahua', colonia: 'Zona Norte',         precio: 1200000, operacion: 'Venta',  estado_publicacion: 'Activa',   m2: 800 },
    { id: 5,  nombre: 'Rancho El Mezquite',         tipo: 'Rancho',       estado: 'Chihuahua', colonia: 'Periférico',         precio: 1950000, operacion: 'Venta',  estado_publicacion: 'Activa',   m2: 5000 },
    { id: 6,  nombre: 'Casa Valle Dorado',          tipo: 'Casa',         estado: 'Sinaloa',   colonia: 'Valle Dorado',       precio: 750000,  operacion: 'Venta',  estado_publicacion: 'Activa',   recamaras: 4, banos: 3, m2: 220 },
    { id: 7,  nombre: 'Departamento Vista Mar',     tipo: 'Departamento', estado: 'Sinaloa',   colonia: 'Playas',             precio: 1100000, operacion: 'Venta',  estado_publicacion: 'Activa',   recamaras: 2, banos: 2, m2: 95  },
    { id: 8,  nombre: 'Granja Orgánica Los Pinos',  tipo: 'Granja',       estado: 'Sinaloa',   colonia: 'Zona Rural',         precio: 430000,  operacion: 'Venta',  estado_publicacion: 'Pendiente',m2: 3000 },
    { id: 9,  nombre: 'Terreno Residencial Costa',  tipo: 'Terreno',      estado: 'Sinaloa',   colonia: 'Costa Dorada',       precio: 620000,  operacion: 'Venta',  estado_publicacion: 'Activa',   m2: 400 },
    { id: 10, nombre: 'Casa en Renta Delicias',     tipo: 'Casa',         estado: 'Chihuahua', colonia: 'Delicias',           precio: 380000,  operacion: 'Renta',  estado_publicacion: 'Activa',   recamaras: 3, banos: 2, m2: 150 },
    { id: 11, nombre: 'Bodega Logística Culiacán',  tipo: 'Bodega',       estado: 'Sinaloa',   colonia: 'Parque Industrial',  precio: 890000,  operacion: 'Venta',  estado_publicacion: 'Inactiva', m2: 600 },
    { id: 12, nombre: 'Local Comercial Centro',     tipo: 'Otro',         estado: 'Chihuahua', colonia: 'Centro Comercial',   precio: 1500000, operacion: 'Venta',  estado_publicacion: 'Activa',   m2: 120 },
  ];

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let result = [...this.properties];

    if (this.selectedEstado) {
      result = result.filter(p => p.estado === this.selectedEstado);
    }

    if (this.selectedTipo) {
      result = result.filter(p => p.tipo === this.selectedTipo);
    }

    if (this.selectedRango) {
      const rango = this.rangosPrecios.find(r => r.value === this.selectedRango);
      if (rango) {
        result = result.filter(p => p.precio >= rango.min && p.precio <= rango.max);
      }
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        p.colonia.toLowerCase().includes(q) ||
        p.estado.toLowerCase().includes(q)
      );
    }

    if (this.selectedSort) {
      switch (this.selectedSort.value) {
        case 'precio_asc':  result.sort((a, b) => a.precio - b.precio); break;
        case 'precio_desc': result.sort((a, b) => b.precio - a.precio); break;
        case 'nombre_asc':  result.sort((a, b) => a.nombre.localeCompare(b.nombre)); break;
      }
    }

    this.filteredProperties = result;
  }

  clearFilters(): void {
    this.selectedEstado = null;
    this.selectedTipo   = null;
    this.selectedRango  = null;
    this.searchQuery    = '';
    this.selectedSort   = null;
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return !!(this.selectedEstado || this.selectedTipo || this.selectedRango || this.searchQuery);
  }

  getCountByEstado(estado: string): number {
    return this.properties.filter(p => p.estado === estado).length;
  }

  getTipoIcon(tipo: TipoPropiedad): string {
    const map: Record<TipoPropiedad, string> = {
      Casa:         '🏠',
      Departamento: '🏢',
      Terreno:      '🌿',
      Bodega:       '🏭',
      Granja:       '🌾',
      Rancho:       '🐄',
      Otro:         '🏗️',
    };
    return map[tipo] ?? '🏠';
  }

  getLabelEstado(): string {
    return this.estados.find(e => e.value === this.selectedEstado)?.label ?? '';
  }

  getLabelTipo(): string {
    return this.tiposPropiedad.find(t => t.value === this.selectedTipo)?.label ?? '';
  }

  getLabelRango(): string {
    return this.rangosPrecios.find(r => r.value === this.selectedRango)?.label ?? '';
  }
}
