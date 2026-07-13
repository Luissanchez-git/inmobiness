import { PackagesService } from '../services/packages/packages.service';
import { Component, OnInit } from '@angular/core';
import { PreloaderComponent } from '../../shared/preloader/preloader.component';
import { CurrencyPipe, DatePipe, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Table, TableModule } from 'primeng/table';
import { UsersService } from '../services/users/users.service';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Router } from '@angular/router';
import { MessagesService } from '../../services/messages/messages.service';
import { CardModule } from 'primeng/card';

@Component({
    standalone:true,
    selector: 'app-recoleccion',
    imports: [CardModule, TableModule, ButtonModule, SelectModule,FormsModule, TagModule],
    templateUrl: './recoleccion.component.html',
    styleUrl: './recoleccion.component.scss'
})
export class RecoleccionComponent {
  constructor(private router: Router) {}

  agregarPropiedad(): void {
    this.router.navigate(['/admin/add/recoleccion']);
  }

  propiedades = [
    {
      imagen: 'https://via.placeholder.com/150',
      terreno: 200,
      construccion: 180,
      recamaras: '3 con armarios',
      banos: '2.5',
      areas: ['Cocina', 'Sala', 'Oficina', 'Lavandería'],
      servicios: {
        agua: true,
        drenaje: true,
        electricidad: true,
        gas: true,
        telefono: true,
        internet: true
      },
      estado: 'Amueblado',
      petFriendly: true,
      ninos: true,
      mensualidad: 25000,
      mantenimiento: 1500,
      deposito: 50000,
      ubicacion: 'Col. Centro, Chihuahua',
      puntosInteres: ['Parque', 'Escuela', 'Supermercado']
    }
    // Puedes agregar más objetos aquí
  ];
}
