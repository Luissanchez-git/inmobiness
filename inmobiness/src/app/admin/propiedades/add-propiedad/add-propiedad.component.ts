import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { PropiedadesService } from '../../../services/propiedades/propiedades.service';
import { JwtHelperService } from '../../../services/jwt/jwt-helper.service';

interface ImagePreview {
  url: string;
  file: File;
}

@Component({
  selector: 'app-nueva-propiedad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule, CurrencyPipe],
  templateUrl: './add-propiedad.component.html',
  styleUrls: ['./add-propiedad.component.css'],
})
export class addPropiedadComponent implements OnInit {

  @Output() saved  = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  isSubmitting = false;
  imagePreviews: ImagePreview[] = [];

  // ── Catálogos ────────────────────────────────────
  tiposPropiedad = [
    { label: '🏠 Casa',         value: 'Casa'         },
    { label: '🏢 Departamento', value: 'Departamento' },
    { label: '🌿 Terreno',      value: 'Terreno'      },
    { label: '🏭 Bodega',       value: 'Bodega'       },
    { label: '🌾 Granja',       value: 'Granja'       },
    { label: '🐄 Rancho',       value: 'Rancho'       },
    { label: '🏗️ Otro',        value: 'Otro'         },
  ];

  operaciones = [
    { label: 'Venta', value: 'Venta', icon: '🏷️' },
    { label: 'Renta', value: 'Renta', icon: '🔑' },
  ];

  monedas = [
    { label: 'MXN', value: 'MXN' },
    { label: 'USD', value: 'USD' },
  ];

  estados = [
    { label: 'Chihuahua', value: 'Chihuahua' },
    { label: 'Sinaloa',   value: 'Sinaloa'   },
  ];

  municipios = [
    { label: 'Chihuahua',  value: 'Chihuahua',  estadoId: 'Chihuahua' },
    { label: 'Juárez',     value: 'Juárez',      estadoId: 'Chihuahua' },
    { label: 'Delicias',   value: 'Delicias',    estadoId: 'Chihuahua' },
    { label: 'Parral',     value: 'Parral',      estadoId: 'Chihuahua' },
    { label: 'Culiacán',   value: 'Culiacán',    estadoId: 'Sinaloa'   },
    { label: 'Mazatlán',   value: 'Mazatlán',    estadoId: 'Sinaloa'   },
    { label: 'Los Mochis', value: 'Los Mochis',  estadoId: 'Sinaloa'   },
  ];

  filteredMunicipios: { label: string; value: string }[] = [];

  estadosPublicacion = [
    {
      label: 'Activa',    value: 'Activa',
      icon: '✅', desc: 'Visible para todos los usuarios',
      activeClass: 'border-emerald-400 bg-emerald-50',
    },
    {
      label: 'Pendiente', value: 'Pendiente',
      icon: '⏳', desc: 'En revisión, no visible aún',
      activeClass: 'border-amber-400 bg-amber-50',
    },
    {
      label: 'Inactiva',  value: 'Inactiva',
      icon: '🚫', desc: 'Oculta, solo visible para admins',
      activeClass: 'border-red-300 bg-red-50',
    },
  ];

  caracteristicasFields = [
    { key: 'recamaras',       label: 'Recámaras',      placeholder: '0',   prefix: '',  suffix: ''    },
    { key: 'banos',           label: 'Baños',           placeholder: '0',   prefix: '',  suffix: ''    },
    { key: 'estacionamiento', label: 'Estacionamiento', placeholder: '0',   prefix: '',  suffix: ''    },
    { key: 'm2_construccion', label: 'M² Construcción', placeholder: '0',   prefix: '',  suffix: 'm²'  },
    { key: 'm2_terreno',      label: 'M² Terreno',      placeholder: '0',   prefix: '',  suffix: 'm²'  },
    { key: 'antiguedad',      label: 'Antigüedad',      placeholder: '0',   prefix: '',  suffix: 'años'},
    { key: 'niveles',         label: 'Niveles',         placeholder: '1',   prefix: '',  suffix: ''    },
    { key: 'precio_m2',       label: 'Precio x m²',     placeholder: '0',   prefix: '$', suffix: ''    },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private propiedadesService: PropiedadesService,
    private jwtHelper: JwtHelperService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      // Información general
      nombre:             ['', [Validators.required, Validators.minLength(3)]],
      descripcion:        [''],
      tipo:               [null, Validators.required],
      operacion:          ['Venta', Validators.required],
      // Ubicación
      estado:             [null, Validators.required],
      municipio:          [null, Validators.required],
      colonia:            ['', Validators.required],
      calle:              [''],
      numero:             [''],
      // Precio
      precio:             [null, [Validators.required, Validators.min(1)]],
      moneda:             ['MXN'],
      // Características
      recamaras:          [null],
      banos:              [null],
      estacionamiento:    [null],
      m2_construccion:    [null],
      m2_terreno:         [null],
      antiguedad:         [null],
      niveles:            [null],
      precio_m2:          [null],
      // Publicación
      estado_publicacion: ['Activa'],
    });
  }

  onEstadoChange(): void {
    const estadoVal = this.form.get('estado')?.value;
    this.filteredMunicipios = this.municipios.filter(m => m.estadoId === estadoVal);
    this.form.patchValue({ municipio: null });
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  // ── Manejo de imágenes ───────────────────────────
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) this.processFiles(Array.from(input.files));
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = Array.from(event.dataTransfer?.files ?? []).filter(f => f.type.startsWith('image/'));
    this.processFiles(files);
  }

  private processFiles(files: File[]): void {
    const remaining = 10 - this.imagePreviews.length;
    files.slice(0, remaining).forEach(file => {
      if (file.size > 5 * 1024 * 1024) return; // máx 5MB
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviews.push({ url: e.target?.result as string, file });
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
  }

  // ── Submit ───────────────────────────────────────
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    Object.entries(this.form.value).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value as string);
      }
    });
    const userId = this.jwtHelper.id();
    if (userId) {
      formData.append('id_user', String(userId));
    }
    this.imagePreviews.forEach(p => formData.append('imagenes[]', p.file));

    this.propiedadesService.addPropiedad(formData).subscribe({
      next: (res: any) => {
        this.saved.emit(res.data);
        this.isSubmitting = false;
        this.goBack();
      },
      error: (err: any) => {
        console.error(err);
        this.isSubmitting = false;
      },
    });
  }

  goBack(): void {
    // Si usas router: this.router.navigate(['/admin/propiedades']);
    this.cancel.emit();
    this.router.navigate(['/admin/propiedades']);
  }
}
