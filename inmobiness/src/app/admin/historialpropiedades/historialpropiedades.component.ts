import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

type TipoPropiedad = 'Casa' | 'Departamento' | 'Terreno' | 'Bodega' | 'Granja' | 'Rancho' | 'Otro';

interface Propiedad {
  id: number;
  nombre: string;
  tipo: TipoPropiedad;
  estado: string;
  colonia: string;
  precio: number;
  operacion: 'Venta' | 'Renta';
  estado_publicacion: 'Activa' | 'Pendiente' | 'Inactiva';
}

interface DashboardStats {
  total: number;
  venta: number;
  renta: number;
  activas: number;
  pendientes: number;
  inactivas: number;
  nuevasMes: number;
}

interface TipoStat {
  label: string;
  icon: string;
  count: number;
  color: string;
}

interface EstadoStat {
  estado: string;
  venta: number;
  renta: number;
}

@Component({
  selector: 'app-historialpropiedades',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './historialpropiedades.component.html',
  styleUrls: ['./historialpropiedades.component.css'],
})
export class HistorialPropiedadesComponent implements OnInit {

  today = new Date();
  stats: DashboardStats = { total: 0, venta: 0, renta: 0, activas: 0, pendientes: 0, inactivas: 0, nuevasMes: 0 };
  statsByTipo: TipoStat[] = [];
  statsByEstado: EstadoStat[] = [];
  recentProperties: Propiedad[] = [];

  // ── Datos (reemplaza con tu servicio) ───────────
  private properties: Propiedad[] = [
    { id: 1,  nombre: 'Casa Residencial Lomas',        tipo: 'Casa',         estado: 'Chihuahua', colonia: 'Lomas de Chapultepec', precio: 1850000, operacion: 'Venta',  estado_publicacion: 'Activa'    },
    { id: 2,  nombre: 'Departamento Centro Histórico', tipo: 'Departamento', estado: 'Chihuahua', colonia: 'Centro',               precio: 950000,  operacion: 'Venta',  estado_publicacion: 'Activa'    },
    { id: 3,  nombre: 'Terreno Industrial Norte',      tipo: 'Terreno',      estado: 'Chihuahua', colonia: 'Parque Industrial',    precio: 480000,  operacion: 'Venta',  estado_publicacion: 'Pendiente' },
    { id: 4,  nombre: 'Bodega Zona Norte',             tipo: 'Bodega',       estado: 'Chihuahua', colonia: 'Zona Norte',           precio: 1200000, operacion: 'Venta',  estado_publicacion: 'Activa'    },
    { id: 5,  nombre: 'Rancho El Mezquite',            tipo: 'Rancho',       estado: 'Chihuahua', colonia: 'Periférico',           precio: 1950000, operacion: 'Venta',  estado_publicacion: 'Activa'    },
    { id: 6,  nombre: 'Casa Valle Dorado',             tipo: 'Casa',         estado: 'Sinaloa',   colonia: 'Valle Dorado',         precio: 750000,  operacion: 'Venta',  estado_publicacion: 'Activa'    },
    { id: 7,  nombre: 'Departamento Vista Mar',        tipo: 'Departamento', estado: 'Sinaloa',   colonia: 'Playas',               precio: 1100000, operacion: 'Renta',  estado_publicacion: 'Activa'    },
    { id: 8,  nombre: 'Granja Orgánica Los Pinos',     tipo: 'Granja',       estado: 'Sinaloa',   colonia: 'Zona Rural',           precio: 430000,  operacion: 'Renta',  estado_publicacion: 'Pendiente' },
    { id: 9,  nombre: 'Terreno Residencial Costa',     tipo: 'Terreno',      estado: 'Sinaloa',   colonia: 'Costa Dorada',         precio: 620000,  operacion: 'Renta',  estado_publicacion: 'Activa'    },
    { id: 10, nombre: 'Casa en Renta Delicias',        tipo: 'Casa',         estado: 'Chihuahua', colonia: 'Delicias',             precio: 380000,  operacion: 'Renta',  estado_publicacion: 'Activa'    },
    { id: 11, nombre: 'Bodega Logística Culiacán',     tipo: 'Bodega',       estado: 'Sinaloa',   colonia: 'Parque Industrial',    precio: 890000,  operacion: 'Venta',  estado_publicacion: 'Inactiva'  },
    { id: 12, nombre: 'Local Comercial Centro',        tipo: 'Otro',         estado: 'Chihuahua', colonia: 'Centro Comercial',     precio: 1500000, operacion: 'Venta',  estado_publicacion: 'Activa'    },
  ];

  ngOnInit(): void {
    this.calcularStats();
  }

  private calcularStats(): void {
    const props = this.properties;

    this.stats = {
      total:      props.length,
      venta:      props.filter(p => p.operacion === 'Venta').length,
      renta:      props.filter(p => p.operacion === 'Renta').length,
      activas:    props.filter(p => p.estado_publicacion === 'Activa').length,
      pendientes: props.filter(p => p.estado_publicacion === 'Pendiente').length,
      inactivas:  props.filter(p => p.estado_publicacion === 'Inactiva').length,
      nuevasMes:  3, // Aquí conecta con tu lógica de fecha
    };

    // Por tipo
    const tipos: { label: TipoPropiedad; icon: string; color: string }[] = [
      { label: 'Casa',         icon: '🏠', color: 'bg-[#c9a96e]'  },
      { label: 'Departamento', icon: '🏢', color: 'bg-[#4a6fa5]'  },
      { label: 'Terreno',      icon: '🌿', color: 'bg-emerald-500' },
      { label: 'Bodega',       icon: '🏭', color: 'bg-slate-500'   },
      { label: 'Granja',       icon: '🌾', color: 'bg-lime-500'    },
      { label: 'Rancho',       icon: '🐄', color: 'bg-amber-700'   },
      { label: 'Otro',         icon: '🏗️', color: 'bg-[#9a9a9a]'  },
    ];

    this.statsByTipo = tipos
      .map(t => ({ ...t, count: props.filter(p => p.tipo === t.label).length }))
      .filter(t => t.count > 0)
      .sort((a, b) => b.count - a.count);

    // Por estado
    const estados = [...new Set(props.map(p => p.estado))];
    this.statsByEstado = estados.map(est => ({
      estado: est,
      venta:  props.filter(p => p.estado === est && p.operacion === 'Venta').length,
      renta:  props.filter(p => p.estado === est && p.operacion === 'Renta').length,
    }));

    // Últimas 5
    this.recentProperties = [...props].slice(-5).reverse();
  }

  // ── Helpers ──────────────────────────────────────
  getPct(value: number): number {
    if (!this.stats.total) return 0;
    return Math.round((value / this.stats.total) * 100);
  }

  getTypePct(count: number): number {
    const max = Math.max(...this.statsByTipo.map(t => t.count));
    return max ? Math.round((count / max) * 100) : 0;
  }

  /** Convierte un valor a dasharray para SVG donut (circunferencia = 100) */
  getDonutDash(value: number): number {
    return this.stats.total ? Math.round((value / this.stats.total) * 100) : 0;
  }

  /** Offset negativo para encadenar segmentos del donut */
  getDonutOffset(previous: number): number {
    return this.stats.total ? -Math.round((previous / this.stats.total) * 100) : 0;
  }

  getTipoIcon(tipo: TipoPropiedad): string {
    const map: Record<TipoPropiedad, string> = {
      Casa: '🏠', Departamento: '🏢', Terreno: '🌿',
      Bodega: '🏭', Granja: '🌾', Rancho: '🐄', Otro: '🏗️',
    };
    return map[tipo] ?? '🏠';
  }
}
