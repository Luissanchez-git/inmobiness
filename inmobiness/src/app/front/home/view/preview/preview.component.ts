import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PropiedadesService } from '../../../../services/propiedades/propiedades.service';
import { environment } from '../../../../../environments/environment';
import { slugify } from '../../../../shared/utils/slug';

interface PropiedadImagen {
  id: number;
  imagen: string;
  orden: number;
}

interface Propiedad {
  id: number;
  nombre: string;
  descripcion: string | null;
  tipo: string;
  operacion: 'Venta' | 'Renta';
  estado: string;
  municipio: string;
  colonia: string;
  precio: number;
  moneda: string;
  recamaras: number | null;
  banos: number | null;
  estacionamiento: number | null;
  m2_construccion: number | null;
  m2_terreno: number | null;
  imagenes: PropiedadImagen[];
}

@Component({
  selector: 'app-preview',
  imports: [CommonModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent implements OnInit {
  propiedades: Propiedad[] = [];
  filteredPropiedades: Propiedad[] = [];
  searchTerm: string = '';
  selectedTipo: string = 'todos';
  sortBy: string = 'recientes';
  loading = false;

  // Para el acordeón de filtros
  filtrosAbiertos: boolean = false;

  // Opciones para los selects
  tiposPropiedad = [
    { value: 'todos', label: 'Todos los tipos' },
    { value: 'Casa', label: 'Casas' },
    { value: 'Departamento', label: 'Departamentos' },
    { value: 'Terreno', label: 'Terrenos' },
    { value: 'Bodega', label: 'Bodegas' },
    { value: 'Rancho', label: 'Ranchos' },
  ];

  opcionesOrden = [
    { value: 'recientes', label: 'Más recientes' },
    { value: 'precio-asc', label: 'Precio: menor a mayor' },
    { value: 'precio-desc', label: 'Precio: mayor a menor' },
    { value: 'mayor-m2', label: 'Mayor superficie' }
  ];
  type: string = "";

  filtros: { estado?: string; municipio?: string; colonia?: string; operacion?: string } = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propiedadesService: PropiedadesService,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.filtros = {
        estado: params.get('estado') || undefined,
        municipio: params.get('municipio') || undefined,
        colonia: params.get('colonia') || undefined,
        operacion: params.get('operacion') || undefined,
      };
      this.type = this.filtros.operacion || '';
      this.cargarPropiedades();
    });
  }

  cargarPropiedades(): void {
    this.loading = true;
    this.propiedadesService.search(this.filtros).subscribe({
      next: (res: any) => {
        this.propiedades = res.data;
        this.loading = false;
        this.aplicarFiltros();
      },
      error: () => {
        this.propiedades = [];
        this.loading = false;
        this.aplicarFiltros();
      },
    });
  }

  aplicarFiltros(): void {
    let filtradas = [...this.propiedades];

    // Filtro por búsqueda
    if (this.searchTerm) {
      const q = this.searchTerm.toLowerCase();
      filtradas = filtradas.filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        p.colonia.toLowerCase().includes(q) ||
        p.municipio.toLowerCase().includes(q)
      );
    }

    // Filtro por tipo
    if (this.selectedTipo !== 'todos') {
      filtradas = filtradas.filter(p => p.tipo === this.selectedTipo);
    }

    // Ordenamiento
    switch (this.sortBy) {
      case 'precio-asc':
        filtradas.sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-desc':
        filtradas.sort((a, b) => b.precio - a.precio);
        break;
      case 'mayor-m2':
        filtradas.sort((a, b) => (b.m2_construccion ?? b.m2_terreno ?? 0) - (a.m2_construccion ?? a.m2_terreno ?? 0));
        break;
      default: // 'recientes'
        filtradas.sort((a, b) => b.id - a.id);
    }

    this.filteredPropiedades = filtradas;
  }

  toggleFiltros(): void {
    this.filtrosAbiertos = !this.filtrosAbiertos;
  }

  isOpen(section: string): boolean {
    return section === 'filtros' ? this.filtrosAbiertos : false;
  }

  verDetalle(propiedad: Propiedad): void {
    this.router.navigate(['view/propiedad', propiedad.id, slugify(propiedad.nombre)])
  }

  imagenPortada(p: Propiedad): string {
    if (!p.imagenes?.length) {
      return 'https://placehold.co/600x400?text=' + encodeURIComponent(p.tipo);
    }
    const base = environment.appUrl.replace(/\/api\/?$/, '');
    return `${base}/api/propiedad_imagenes/${p.imagenes[0].imagen}`;
  }

  ubicacion(p: Propiedad): string {
    return `${p.colonia}, ${p.municipio}, ${p.estado}`;
  }

  m2(p: Propiedad): number {
    return p.m2_construccion ?? p.m2_terreno ?? 0;
  }

  formatPrecio(precio: number): string {
    return precio.toLocaleString('es-MX', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }
}
