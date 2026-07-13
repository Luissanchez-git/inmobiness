import { Component, OnInit } from '@angular/core';
import { PreloaderComponent } from '../../../shared/preloader/preloader.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {  ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { RoutesService } from '../../services/routes/routes.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MessagesService } from '../../../services/messages/messages.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AuthService } from '../../../services/guards/auth.service';
import { JwtHelperService } from '../../../services/jwt/jwt-helper.service';
import { environment } from '../../../../environments/environment.development';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
@Component({
  selector: 'app-route-view',
  imports: [PreloaderComponent,ButtonModule, TableModule,RouterLink,DatePipe,CurrencyPipe,ToastModule,ConfirmDialogModule,TagModule,MessageModule],
  templateUrl: './route-view.component.html',
  styleUrl: './route-view.component.scss'
})
export class RouteViewComponent implements OnInit{
  loaded: boolean = false;
  id:any = 0;
  data:any=null
  packages:any=[]
  amount:number=0
  amount_file:number=0
  expandedRows = {};
  level = 2
  img_url = environment.appUrl+'packages/default.png'
  url_file =""
  constructor(private route: ActivatedRoute, private rs:RoutesService,private ms:MessagesService, private us:JwtHelperService) { 
    this.level = this.us.getUserData().level
  }
  ngOnInit(): void {
    this.id= this.route.snapshot.paramMap.get('id')+"";
    this.url_file =environment.appUrl+'routess/export/'+this.id
    //console.log()
    this.refresh()
  }

  refresh(){
    this.rs.show(this.id).subscribe((data:any)=>{
      console.log(data)
      this.amount=0
      this.data=data.data.route;
      this.packages=data.data.packages;
      this.packages.forEach((p:any)=>{
        this.amount+=parseFloat(p.package.price)
        this.amount_file+=p.nota3 != null ? p.nota3 : 0
      })
      console.log(this.amount)
      this.loaded=true
    })
    
  }
  confirmDelete(id:number) {
    this.ms.showConfirmation("¿Está seguro de querer eliminar el registro?").then((confirm:any) => {
      if (confirm) {
        this.loaded=false
        this.rs.removeFromRoute(id).subscribe((res:any)=>{
          console.log(res)
          this.ms.showSuccess("Registro eliminado correctamente")
          this.refresh()
        },(err:any)=>{
          console.log(err)
          this.loaded=true
          this.ms.showError("No se pudo eliminar el registro")
        })
       
      } 
    })
  }
  confirmFin() {
    this.ms.showConfirmation("¿Está seguro de querer marcar la ruta como finalizada?").then((confirm:any) => {
      if (confirm) {
        this.loaded=false
        this.rs.removeFromRoute(1).subscribe((res:any)=>{
          console.log(res)
          this.ms.showSuccess("Registro eliminado correctamente")
          this.refresh()
        },(err:any)=>{
          console.log(err)
          this.loaded=true
          this.ms.showError("No se pudo eliminar el registro")
        })
       
      } 
    })
  }
}
