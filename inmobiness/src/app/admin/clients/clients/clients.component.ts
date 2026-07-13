import { Component } from '@angular/core';
import { ClientsService } from '../../services/clients/clients.service';

import { CurrencyPipe, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PreloaderComponent } from '../../../shared/preloader/preloader.component';
@Component({
    standalone:true,
    selector: 'app-clients',
    imports: [PreloaderComponent, RouterLink, TableModule, ButtonModule, CurrencyPipe],
    templateUrl: './clients.component.html',
    styleUrl: './clients.component.scss'
})
export class ClientsComponent {
  loaded:boolean =true
  data:any=[]
  constructor(private cs:ClientsService) {}
  ngOnInit(): void {
    this.refresh()
  }
  async refresh() {
    let u: any = await this.cs.getAll().toPromise();
    this.data = u.data;
    console.log('this users >>>', this.data);
    this.loaded = true;
   
  }
}
