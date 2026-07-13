import { Component, OnInit } from '@angular/core';
import { PreloaderComponent } from '../../shared/preloader/preloader.component';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Table, TableModule } from 'primeng/table';
import { UsersService } from '../services/users/users.service';
import { ButtonModule } from 'primeng/button';
import { MessagesService } from '../../services/messages/messages.service';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
@Component({
    standalone:true,
    selector: 'app-users',
    imports: [PreloaderComponent, RouterLink, TableModule, ButtonModule, Toast,ConfirmDialog
    ],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  
  loaded:boolean =true
  data:any=[]
  constructor(private us:UsersService,private ms:MessagesService) {}
  ngOnInit(): void {
    this.refresh()
  }
  async refresh() {
    let u: any = await this.us.getAll().toPromise();
    this.data = u.data;
    console.log('this users >>>', this.data);
    this.loaded = true;
   
  }
  confirmDelete(id:number) {
    this.ms.showConfirmation("¿Está seguro de querer eliminar el registro?").then((confirm:any) => {
      if (confirm) {
        this.loaded=false
        this.us.removeUser(id).subscribe((res:any)=>{
          console.log(res)
          this.ms.showSuccess("Registro eliminado correctamente")
          this.refresh()
        },(err:any)=>{
          this.loaded=true
          this.ms.showError("No se pudo eliminar el registro")
        })
       
      } 
    })
  }
}
