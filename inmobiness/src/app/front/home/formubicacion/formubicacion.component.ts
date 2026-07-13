import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule,ActivatedRoute } from '@angular/router'
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { EstadosService } from '../../../services/estados/estados.service';

interface Estado {
  id: number;
  nombre: string;
  codigo: string;
}

interface Municipio {
  id: number;
  nombre: string;
  codigo_postal: string | null;
  estado_id: number;
}

interface Colonia {
  id: number;
  nombre: string;
  tipo: string | null;
  codigo_postal: string | null;
  id_municipio: number;
}

@Component({
  selector: 'app-formubicacion',
  standalone: true,
  imports: [DropdownModule,RadioButtonModule,ButtonModule,ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './formubicacion.component.html',
  styleUrls: ['./formubicacion.component.css']
})
export class FormubicacionComponent implements OnInit {
  searchForm!: FormGroup;

  estados: Estado[] = [];

  municipios: Municipio[] = [];

  filteredMunicipios: Municipio[] = [];
  filteredColonias: Colonia[] = [];
  type:string="";
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private route : ActivatedRoute,
    private estadosService: EstadosService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setupFormListeners();
    this.loadEstados();
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type')?.toUpperCase() || "";
    })
  }

  loadEstados(): void {
    this.estadosService.getAll().subscribe((res: any) => {
      this.estados = res.data;
    });
  }

  initForm(): void {
    this.searchForm = this.fb.group({
      tipoPropiedad: ['Renta'],
      estado: [null, ],
      municipio: [{ value: null, }, ],
      colonia: [{ value: null, }, ]
    });
  }

  setupFormListeners(): void {
    // Listener para estado
    this.searchForm.get('estado')?.valueChanges.subscribe(estado => {
      if (estado) {
        this.searchForm.get('municipio')?.enable();
        this.searchForm.patchValue({
          municipio: null,
          colonia: null
        });
        this.searchForm.get('colonia')?.disable();
        this.filteredColonias = [];

        this.estadosService.getMunicipios(estado.id).subscribe((res: any) => {
          this.filteredMunicipios = res.data;
        });
      } else {
        this.filteredMunicipios = [];
        this.filteredColonias = [];
        this.searchForm.get('municipio')?.disable();
        this.searchForm.get('colonia')?.disable();
      }
    });

    // Listener para municipio
    this.searchForm.get('municipio')?.valueChanges.subscribe(municipio => {
      if (municipio) {
        this.searchForm.get('colonia')?.enable();
        this.searchForm.patchValue({
          colonia: null
        });

        this.estadosService.getColonias(municipio.id).subscribe((res: any) => {
          this.filteredColonias = res.data;
        });
      } else {
        this.filteredColonias = [];
        this.searchForm.get('colonia')?.disable();
      }
    });
  }


  backPage(): void {
    this.location.back();
  }

  onSubmit(): void {

    if (this.searchForm.valid) {
      const searchData = this.searchForm.getRawValue();
      console.log('Datos de búsqueda:', searchData);


      // Navegar a la página de resultados con los parámetros
      this.router.navigate(['/propiedades'], {
        queryParams: {
          operacion: searchData.tipoPropiedad,
          estado: searchData.estado?.nombre,
          municipio: searchData.municipio?.nombre,
          colonia: searchData.colonia?.nombre
        }
      });
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.searchForm.controls).forEach(key => {
        this.searchForm.get(key)?.markAsTouched();
      });
    }
  }

  resetForm(): void {
    this.searchForm.reset({
      tipoPropiedad: 'Renta'
    });
    this.filteredMunicipios = [];
    this.filteredColonias = [];
    this.searchForm.get('municipio')?.disable();
    this.searchForm.get('colonia')?.disable();
  }
}
