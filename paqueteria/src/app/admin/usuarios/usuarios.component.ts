import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

export type RolUsuario = 'Admin' | 'Agente' | 'Cliente';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono?: string;
  rol: RolUsuario;
  activo: boolean;
  propiedades_compartidas: number;
  ultimo_acceso: Date;
  fecha_registro: Date;
}

interface ModalForm {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  rol: RolUsuario | null;
  activo: boolean;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, DatePipe],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {

  // ── Vista ────────────────────────────────────────
  viewMode: 'grid' | 'list' = 'list';

  // ── Filtros ──────────────────────────────────────
  selectedRol:    string | null = null;
  selectedEstado: string | null = null;
  searchQuery = '';
  selectedSort: any = null;

  // ── Modal ────────────────────────────────────────
  showModal = false;
  editingUser: Usuario | null = null;
  modalForm: ModalForm = this.emptyForm();

  // ── Resultados ───────────────────────────────────
  filteredUsers: Usuario[] = [];

  // ── Catálogos ────────────────────────────────────
  roles = [
    { label: 'Admin',   value: 'Admin',   icon: '👑' },
    { label: 'Agente',  value: 'Agente',  icon: '🏠' },
    { label: 'Cliente', value: 'Cliente', icon: '👤' },
  ];

  estados = [
    { label: 'Activo',   value: 'activo'   },
    { label: 'Inactivo', value: 'inactivo' },
  ];

  sortOptions = [
    { label: 'Nombre A-Z',          value: 'nombre_asc'   },
    { label: 'Nombre Z-A',          value: 'nombre_desc'  },
    { label: 'Más recientes',       value: 'recientes'    },
    { label: 'Más propiedades',     value: 'props_desc'   },
  ];

  // ── Datos de ejemplo ─────────────────────────────
  users: Usuario[] = [
    { id: 1,  nombre: 'Carlos',    apellido: 'Mendoza',    correo: 'carlos@inmobiness.mx',   telefono: '614 123 4567', rol: 'Admin',   activo: true,  propiedades_compartidas: 0,  ultimo_acceso: new Date('2026-04-15'), fecha_registro: new Date('2024-01-10') },
    { id: 2,  nombre: 'Sofía',     apellido: 'Ramírez',    correo: 'sofia@inmobiness.mx',    telefono: '614 234 5678', rol: 'Agente',  activo: true,  propiedades_compartidas: 12, ultimo_acceso: new Date('2026-04-14'), fecha_registro: new Date('2024-03-05') },
    { id: 3,  nombre: 'Luis',      apellido: 'Torres',     correo: 'ltorres@gmail.com',      telefono: '614 345 6789', rol: 'Cliente', activo: true,  propiedades_compartidas: 3,  ultimo_acceso: new Date('2026-04-13'), fecha_registro: new Date('2024-06-20') },
    { id: 4,  nombre: 'Ana',       apellido: 'García',     correo: 'ana.garcia@hotmail.com', telefono: '667 456 7890', rol: 'Cliente', activo: false, propiedades_compartidas: 1,  ultimo_acceso: new Date('2026-02-28'), fecha_registro: new Date('2024-07-15') },
    { id: 5,  nombre: 'Miguel',    apellido: 'López',      correo: 'mlopez@inmobiness.mx',   telefono: '614 567 8901', rol: 'Agente',  activo: true,  propiedades_compartidas: 8,  ultimo_acceso: new Date('2026-04-16'), fecha_registro: new Date('2024-02-14') },
    { id: 6,  nombre: 'Valentina', apellido: 'Herrera',    correo: 'vherrera@gmail.com',     telefono: '667 678 9012', rol: 'Cliente', activo: true,  propiedades_compartidas: 5,  ultimo_acceso: new Date('2026-04-10'), fecha_registro: new Date('2024-08-03') },
    { id: 7,  nombre: 'Roberto',   apellido: 'Castillo',   correo: 'rcastillo@gmail.com',                             rol: 'Cliente', activo: true,  propiedades_compartidas: 2,  ultimo_acceso: new Date('2026-03-30'), fecha_registro: new Date('2024-09-12') },
    { id: 8,  nombre: 'Daniela',   apellido: 'Morales',    correo: 'daniela@inmobiness.mx',  telefono: '614 789 0123', rol: 'Agente',  activo: true,  propiedades_compartidas: 15, ultimo_acceso: new Date('2026-04-15'), fecha_registro: new Date('2024-01-25') },
    { id: 9,  nombre: 'Fernando',  apellido: 'Vega',       correo: 'fvega@outlook.com',      telefono: '614 890 1234', rol: 'Cliente', activo: false, propiedades_compartidas: 0,  ultimo_acceso: new Date('2026-01-15'), fecha_registro: new Date('2024-10-05') },
    { id: 10, nombre: 'Patricia',  apellido: 'Sánchez',    correo: 'psanchez@gmail.com',     telefono: '667 901 2345', rol: 'Cliente', activo: true,  propiedades_compartidas: 7,  ultimo_acceso: new Date('2026-04-12'), fecha_registro: new Date('2024-11-18') },
  ];

  ngOnInit(): void {
    this.applyFilters();
  }

  // ── Filtrado ─────────────────────────────────────
  applyFilters(): void {
    let result = [...this.users];

    if (this.selectedRol) {
      result = result.filter(u => u.rol === this.selectedRol);
    }

    if (this.selectedEstado) {
      result = result.filter(u =>
        this.selectedEstado === 'activo' ? u.activo : !u.activo
      );
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(u =>
        u.nombre.toLowerCase().includes(q) ||
        u.apellido.toLowerCase().includes(q) ||
        u.correo.toLowerCase().includes(q) ||
        (u.telefono ?? '').includes(q)
      );
    }

    if (this.selectedSort) {
      switch (this.selectedSort.value) {
        case 'nombre_asc':  result.sort((a, b) => a.nombre.localeCompare(b.nombre)); break;
        case 'nombre_desc': result.sort((a, b) => b.nombre.localeCompare(a.nombre)); break;
        case 'recientes':   result.sort((a, b) => b.fecha_registro.getTime() - a.fecha_registro.getTime()); break;
        case 'props_desc':  result.sort((a, b) => b.propiedades_compartidas - a.propiedades_compartidas); break;
      }
    }

    this.filteredUsers = result;
  }

  clearFilters(): void {
    this.selectedRol    = null;
    this.selectedEstado = null;
    this.searchQuery    = '';
    this.selectedSort   = null;
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return !!(this.selectedRol || this.selectedEstado || this.searchQuery);
  }

  // ── Contadores ───────────────────────────────────
  getCountByRol(rol: string): number {
    return this.users.filter(u => u.rol === rol).length;
  }

  // ── Labels filtros ───────────────────────────────
  getLabelRol(): string {
    return this.roles.find(r => r.value === this.selectedRol)?.label ?? '';
  }

  getLabelEstado(): string {
    return this.estados.find(e => e.value === this.selectedEstado)?.label ?? '';
  }

  // ── Helpers UI ───────────────────────────────────
  getInitials(nombre: string, apellido: string): string {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  }

  getRolColor(rol: RolUsuario): string {
    const map: Record<RolUsuario, string> = {
      Admin:   'bg-[#1a1a2e]',
      Agente:  'bg-[#c9a96e]',
      Cliente: 'bg-[#4a6fa5]',
    };
    return map[rol];
  }

  getRolBadgeClass(rol: RolUsuario): string {
    const map: Record<RolUsuario, string> = {
      Admin:   'bg-[#1a1a2e] text-[#c9a96e]',
      Agente:  'bg-[#c9a96e]/20 text-[#b8924f]',
      Cliente: 'bg-blue-100 text-blue-700',
    };
    return map[rol];
  }

  // ── CRUD ─────────────────────────────────────────
  openCreateModal(): void {
    this.editingUser = null;
    this.modalForm   = this.emptyForm();
    this.showModal   = true;
  }

  editUser(user: Usuario): void {
    this.editingUser = user;
    this.modalForm = {
      nombre:   user.nombre,
      apellido: user.apellido,
      correo:   user.correo,
      telefono: user.telefono ?? '',
      rol:      user.rol,
      activo:   user.activo,
    };
    this.showModal = true;
  }

  viewUser(user: Usuario): void {
    // Aquí puedes navegar al detalle o abrir un modal de solo lectura
    console.log('Ver usuario:', user);
  }

  saveUser(): void {
    if (!this.modalForm.nombre || !this.modalForm.correo || !this.modalForm.rol) return;

    if (this.editingUser) {
      // Editar existente
      const idx = this.users.findIndex(u => u.id === this.editingUser!.id);
      if (idx !== -1) {
        this.users[idx] = {
          ...this.users[idx],
          nombre:   this.modalForm.nombre,
          apellido: this.modalForm.apellido,
          correo:   this.modalForm.correo,
          telefono: this.modalForm.telefono || undefined,
          rol:      this.modalForm.rol,
          activo:   this.modalForm.activo,
        };
      }
    } else {
      // Crear nuevo
      const newUser: Usuario = {
        id:                      Math.max(...this.users.map(u => u.id)) + 1,
        nombre:                  this.modalForm.nombre,
        apellido:                this.modalForm.apellido,
        correo:                  this.modalForm.correo,
        telefono:                this.modalForm.telefono || undefined,
        rol:                     this.modalForm.rol,
        activo:                  this.modalForm.activo,
        propiedades_compartidas: 0,
        ultimo_acceso:           new Date(),
        fecha_registro:          new Date(),
      };
      this.users.push(newUser);
    }

    this.applyFilters();
    this.closeModal();
  }

  deleteUser(user: Usuario): void {
    if (confirm(`¿Eliminar a ${user.nombre} ${user.apellido}?`)) {
      this.users = this.users.filter(u => u.id !== user.id);
      this.applyFilters();
    }
  }

  closeModal(): void {
    this.showModal   = false;
    this.editingUser = null;
    this.modalForm   = this.emptyForm();
  }

  private emptyForm(): ModalForm {
    return { nombre: '', apellido: '', correo: '', telefono: '', rol: null, activo: true };
  }
}
