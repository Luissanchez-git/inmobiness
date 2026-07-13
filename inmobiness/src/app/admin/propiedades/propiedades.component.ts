import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { RouterLink } from "@angular/router";
import { PropiedadesService } from '../../services/propiedades/propiedades.service';

export interface Propiedad {
  id: number;
  nombre: string;
  tipo: TipoPropiedad;
  estado: string;
  municipio: string;
  colonia: string;
  precio: number;
  moneda: string;
  operacion: 'Venta' | 'Renta';
  estado_publicacion: 'Activa' | 'Pendiente' | 'Inactiva';
  recamaras?: number | null;
  banos?: number | null;
  m2?: number | null;
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

  properties: Propiedad[] = [];
  loading = true;

  constructor(private propiedadesService: PropiedadesService) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.loading = true;
    this.propiedadesService.getAll().subscribe({
      next: (res: any) => {
        this.properties = (res.data ?? []).map((p: any): Propiedad => ({
          id: p.id,
          nombre: p.nombre,
          tipo: p.tipo,
          estado: p.estado,
          municipio: p.municipio,
          colonia: p.colonia,
          precio: +p.precio,
          moneda: p.moneda,
          operacion: p.operacion,
          estado_publicacion: p.estado_publicacion,
          recamaras: p.recamaras,
          banos: p.banos,
          m2: p.m2_construccion ?? p.m2_terreno ?? null,
        }));
        this.loading = false;
        this.applyFilters();
      },
      error: () => {
        this.properties = [];
        this.loading = false;
        this.applyFilters();
      },
    });
  }

  eliminar(id: number, event: Event): void {
    event.stopPropagation();
    if (!confirm('¿Eliminar esta propiedad?')) return;

    this.propiedadesService.removePropiedad(id).subscribe(() => {
      this.properties = this.properties.filter(p => p.id !== id);
      this.applyFilters();
    });
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
