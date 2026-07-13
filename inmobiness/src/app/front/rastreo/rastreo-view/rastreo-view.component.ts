import {Component, Input, OnInit} from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import {NgIf} from "@angular/common";

@Component({
    standalone:true,
    selector: 'app-rastreo-view',
    imports: [TimelineModule,NgIf],
    templateUrl: './rastreo-view.component.html',
    styleUrl: './rastreo-view.component.scss'
})
export class RastreoViewComponent implements OnInit{
  events: any[];
  @Input() data:any;

  ngOnInit(){
    console.log('data', this.data);
  }
  constructor() {
    this.events = [
      { status: 'Recibido', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
      { status: 'En Recoleccion', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
      { status: 'En Transito', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
      { status: 'Entregado', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
    ];
  }
}
