import { environment } from './../../../environments/environment';
import { PackagesService } from './../../admin/services/packages/packages.service';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone:true,
  selector: 'app-packages',
  imports: [TableModule,TagModule,DatePipe,ButtonModule],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss',
  providers:[]
})
export class PackagesComponent {

  localValueStore:any;
  urlTodownloadPdf:any = environment.appUrl+'pdf/'
  guias:any[]=[]

  constructor(private ps:PackagesService){}

  ngOnInit() {
    this.localValueStore  = JSON.parse(localStorage.getItem('dpm_local_user') ?? '{}');
    this.ps.getPackageByClient(this.localValueStore.id).subscribe({
      next: (value:any) => {
        this.guias =  value.data;


      },
      error: (error:any) => {console.log('error', error)}

    })

  }

  downloadPdf =(guia:any) =>{
    window.open(this.urlTodownloadPdf+guia.track_number, '_blank');

  }
  getSeverity = () => {

  }
}
