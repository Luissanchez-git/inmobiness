import { ClientsService } from './../../../services/clients/clients.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SelectModule } from 'primeng/select';
import { Toast } from 'primeng/toast';
@Component({
  selector: 'app-client-add',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, SelectModule,Toast,ConfirmDialogModule],
  templateUrl: './client-add.component.html',
  styleUrl: './client-add.component.scss'
})
export class ClientAddComponent {

  constructor(private fb:FormBuilder,private confirmationService: ConfirmationService, private messageService: MessageService,
    private cl:ClientsService,private router: Router,
) {}
user_id:number=0
user:any=null
is_edit:boolean=false
levels:any=[{id:1,text:'Administrador'},{id:2,text:'Repartidor'}]
form:FormGroup= this.fb.group({

  name: ['Test Name', Validators.required],
  rfc: ['FK12321', Validators.required],
  phone: ['452500', Validators.required],
  balance: ['452500', Validators.required],
  address: ["EJEMPLO", Validators.required],
  lat: ['-12321',Validators.required],
  log: ['-12321',Validators.required],

});
ngOnInit(): void {
  const idString = window.location.href.split('/').pop() || '0';
  this.user_id = parseInt(idString);
  this.is_edit = this.user_id != 0
  if(this.is_edit){
    this.refresh();
  }
}
refresh(){
  this.cl.show(this.user_id).subscribe((res:any)=>{
    console.log(res)
    if(res.success){
        this.user= res.data
        this.form.controls['name'].setValue(this.user.name)
        this.form.controls['rfc'].setValue(this.user.email)
        this.form.controls['phone'].setValue('123')
        this.form.controls['balance'].setValue('123')
        this.form.controls['address'].setValue('123')
        this.form.controls['log'].setValue('123')
        this.form.controls['lat'].setValue('123')

    }else{
      this.router.navigate(['/admin/clients']);
    }
  })
}
save(){

      let data:any={
        name:this.form.value.name,
        rfc:this.form.value.rfc,
        phone:this.form.value.phone,
        balance:this.form.value.balance,
        address:this.form.value.address,
        lat:this.form.value.alt,
        log:this.form.value.log,

      }
      if(this.is_edit){
        this.cl.updateClient(this.user_id,data).subscribe((res:any)=>{
          this.messageService.add({ severity: 'success', summary: 'Listo', detail: 'Usuario actualizado correctamente' });
        },(err:any)=>{
            console.log(err)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al intentar actualizar los datos' });
        })
      }else{
        this.cl.addClient(data).subscribe((res:any)=>{
          this.messageService.add({ severity: 'success', summary: 'Listo', detail: 'Usuario guardado correctamente' });
          this.form.reset()
          //this.router.navigate(['/admin/users']);
        },(err:any)=>{
            console.log(err)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El email ya existe' });
        })
      }


}
}



