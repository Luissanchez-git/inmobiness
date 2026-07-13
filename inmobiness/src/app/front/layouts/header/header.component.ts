import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../../../environments/environment.development';
import { JwtHelperService } from '../../../services/jwt/jwt-helper.service';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { MessagesService } from '../../../services/messages/messages.service';
import {PaymentsService} from '../../../../app/admin/services/payments/payments.service'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
    standalone:true,
    selector: 'app-header',
    imports: [ToastModule,ConfirmDialogModule,ButtonModule,FormsModule,DialogModule,ReactiveFormsModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute,private ps:PaymentsService,private ms:MessagesService,private auth:JwtHelperService,private fb:FormBuilder){}
  paymentForm:FormGroup = this.fb.group({
    amount: ['', [Validators.required, Validators.min(1)]]
  });
    loaded:boolean = false
    amountUser:number = 0;
    dialogVisible:boolean=false
    selectedFile: File | null = null;
    imgdefault = environment.appUrl+"users/default.jpg"
    isAuth:boolean=false
    userName:string = ""
    userImg:string = ""
    localValueStore:any;
    ngOnInit(): void {
      this.localValueStore  = JSON.parse(localStorage.getItem('dpm_local_user') ?? '{}');

      console.log('localValueStore',this.localValueStore.id);
      this.ps.getInfoUser(this.localValueStore.id).subscribe({
        next:(value:any) => {
          console.log('va', value.data);
            this.amountUser = value.monto




        },
        error:(err)=>{console.log('error', err)}
      })

        if(this.auth.isAuthenticated()){
            this.isAuth = true;
            this.userName =this.auth.getUserData().name
            this.userImg = environment.appUrl+'users/'+ this.auth.getUserData().img
        }

    }
    logout(){

        localStorage.removeItem('dpm_'+environment.location)
        localStorage.removeItem('dpm_'+environment.location+"_user")
        window.location.reload();
    }
    onImgError(event:any){
    event.target.src = this.imgdefault
   }

   onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

   showDialog() {

    this.dialogVisible = true;
    console.log("YEA")
  }



  savePayment(){
    if (this.paymentForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('amount', this.paymentForm.value.amount);
      formData.append('file', this.selectedFile);
      formData.append('id_client', this.localValueStore.id);

      this.ps.save(formData).subscribe((res:any)=>{
        console.log('res',res)
        this.loaded=false
        this.dialogVisible = false
        window.location.reload();


      },(err:any)=>{
        this.loaded=true
        this.ms.showError("No se pudo guardar el pago")
      })
    } else {
      this.ms.showError("El formulario no es válido o no se ha seleccionado un archivo.")

    }

  }



}
