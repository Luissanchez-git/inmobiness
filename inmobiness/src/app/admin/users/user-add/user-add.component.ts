import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SelectModule } from 'primeng/select';
import { Toast } from 'primeng/toast';
import { UsersService } from '../../services/users/users.service';
@Component({
    standalone:true,
    selector: 'app-user-add',
    imports: [RouterLink, FormsModule, ReactiveFormsModule, SelectModule,Toast,ConfirmDialogModule],
    templateUrl: './user-add.component.html',
    styleUrl: './user-add.component.scss'
})
export class UserAddComponent implements OnInit{
  constructor(private fb:FormBuilder,private confirmationService: ConfirmationService, private messageService: MessageService,
      private us:UsersService,private router: Router,
  ) {}
  user_id:number=0
  user:any=null
  is_edit:boolean=false
  levels:any=[{id:1,text:'Administrador'},{id:2,text:'Repartidor'}]
  form:FormGroup= this.fb.group({

    name: ['Test Name', Validators.required],
    email: ['test@deskode.com', Validators.required],
    password: ['452500', Validators.required],
    password_confirm: ['452500', Validators.required],
    level: [{id:1, text:"Administrador"}, Validators.required]
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
    this.us.getUser(this.user_id).subscribe((res:any)=>{
      console.log(res)
      if(res.success){
          this.user= res.data
          this.form.controls['name'].setValue(this.user.name)
          this.form.controls['email'].setValue(this.user.email)
          this.form.controls['password'].setValue('123')
          this.form.controls['password_confirm'].setValue('123')
          this.form.controls['level'].setValue(this.levels.find((item:any)=>item.id == this.user.level))
      }else{
        this.router.navigate(['/admin/users']);
      }
    })
  }
  save(){
    if(this.form.value.password !=  this.form.value.password_confirm){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Las contraseñas no coinciden' });
    }else{
        let data:any={
          name:this.form.value.name,
          email:this.form.value.email,
          password:this.form.value.password,
          password_confirm:this.form.value.password_confirm,
          level:this.form.value.level.id,
        }
        if(this.is_edit){
          this.us.updateUser(this.user_id,data).subscribe((res:any)=>{
            this.messageService.add({ severity: 'success', summary: 'Listo', detail: 'Usuario actualizado correctamente' });
          },(err:any)=>{
              console.log(err)
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al intentar actualizar los datos' });
          })
        }else{
          this.us.addUser(data).subscribe((res:any)=>{
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
}
