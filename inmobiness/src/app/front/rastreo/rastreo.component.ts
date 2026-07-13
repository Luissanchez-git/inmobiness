import {Component, OnInit} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { PackagesService } from '../../../app/admin/services/packages/packages.service'
import {InputTextModule} from "primeng/inputtext";
import {RastreoViewComponent} from "./rastreo-view/rastreo-view.component";
import {NgIf} from "@angular/common";
import { ToastModule } from 'primeng/toast';

import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

@Component({
    standalone:true,
    selector: 'app-rastreo',
    imports: [ButtonModule, InputNumberModule, FormsModule, InputTextModule,
      RastreoViewComponent, NgIf,
      ToastModule,
      MessageModule],
    templateUrl: './rastreo.component.html',
    styleUrl: './rastreo.component.scss',
    providers: [MessageService]
})
export class RastreoComponent implements OnInit {

value:any = null;
packageSearching:any= '';
packages:any= '';
showDetailsPackage:any = 0;
constructor(private packagesService: PackagesService,    private ms: MessageService,
) { }


  async ngOnInit() {

  }

  rastrearPaquete(){

    this.packagesService.get(this.value).subscribe( {
      next: (value:any) => {
        const { status, data} = value;
        if(status !== 'success'){
          this.showError();
          return;
        }
        this.showDetailsPackage = 1;
        this.packageSearching=data
        console.log(this.packageSearching);
      },
      error: error => {console.log('Errorrr');}
    });
  }

  showError() {
    this.ms.add({ severity: 'error', summary: 'Error', detail: 'El numero que ingreso es incorrecto' });
  }


}
