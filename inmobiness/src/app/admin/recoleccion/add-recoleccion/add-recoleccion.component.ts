import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  standalone: true,
  selector: 'app-add-recoleccion',
  imports: [SelectButtonModule,RouterLink,FileUploadModule,ReactiveFormsModule,CardModule,ButtonModule,CheckboxModule,InputNumberModule,InputTextModule],
  templateUrl: './add-recoleccion.component.html',
  styleUrl: './add-recoleccion.component.scss'
})
export class AddRecoleccionComponent {
  propiedadForm: FormGroup;
  tiposPropiedad = [
    { label: 'Casa', value: 'casa' },
    { label: 'Departamento', value: 'departamento' },
    { label: 'Local', value: 'local' },
    { label: 'Oficina', value: 'oficina' },
    { label: 'Terreno', value: 'terreno' },
    { label: 'Bodega', value: 'bodega' },
    { label: 'Granja', value: 'granja' },
    { label: 'Rancho', value: 'rancho' }
  ];
  constructor(private fb: FormBuilder) {
    this.propiedadForm = this.fb.group({
      tipoPropiedad: [null, Validators.required],
      titulo: ['', Validators.required],
      subTitulo: ['', Validators.required],
      imagenUrl: ['', Validators.required],
      terreno: [0, [Validators.required, Validators.min(1)]],
      construccion: [0, [Validators.required, Validators.min(1)]],
      recamaras: [0, [Validators.required, Validators.min(1)]],
      banos: [0, [Validators.required, Validators.min(0.5)]],
      areas: ['', Validators.required],
      servicios: ['', Validators.required],
      renta: this.fb.group({
        amueblado: [false],
        petFriendly: [false],
        ninos: [false],
        mensualidad: [123, Validators.required],
        mantenimiento: [456],
        deposito: [789]
      }),
      puntosInteres: ['', Validators.required]
    });
  }

  subirImagen(event: any) {
    const archivo = event.files[0];

    // Simulación de subida (puedes integrar Firebase, S3, etc.)
    const reader = new FileReader();
    reader.onload = () => {
      const imagenBase64 = reader.result as string;
      this.propiedadForm.get('imagenUrl')?.setValue(imagenBase64); // o URL real si subes al backend
    };
    reader.readAsDataURL(archivo);
  }



  guardarPropiedad() {
    if (this.propiedadForm.valid) {
      const nuevaPropiedad = this.propiedadForm.value;
      console.log('Propiedad creada:', nuevaPropiedad);
      // Aquí podrías emitir un evento, llamar a un servicio, etc.
    } else {
      this.propiedadForm.markAllAsTouched();
    }
  }
}
