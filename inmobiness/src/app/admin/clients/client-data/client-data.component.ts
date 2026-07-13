import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../../services/clients/clients.service';

import { CurrencyPipe, DatePipe, NgClass, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PreloaderComponent } from '../../../shared/preloader/preloader.component';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { AdressService } from '../../../services/address/adress.service';
import { MessagesService } from '../../../services/messages/messages.service';
import { PaymentsService } from '../../services/payments/payments.service';
@Component({
    standalone:true,
    selector: 'app-client-data',
    imports: [PreloaderComponent, RouterLink, TableModule, ButtonModule, CurrencyPipe,
        DatePipe, DialogModule, ConfirmDialogModule, ConfirmDialogModule, ToastModule,FormsModule, ReactiveFormsModule,SelectModule],
    templateUrl: './client-data.component.html',
    styleUrl: './client-data.component.scss'
})
export class ClientDataComponent {
  id:any = 0
  loaded:boolean = false
  data:any=null
  status_view = 2
  payments:any=[]
  history:any=[]
  address:any=[]
  dialogVisible:boolean=false
  dialogVisibleAddress:boolean=false
  types:any=[{id:'from',text:'Recolección'},{id:'to',text:'Envío'}]
  default:any=[{value:true, text:'Si'},{value:false, text:'no'}]
  form:FormGroup= this.fb.group({
  
    street: ['Calle Principal', [Validators.required, Validators.maxLength(255)]],
    exterior_number: ['123', [Validators.required, Validators.maxLength(50)]],
    interior_number: ['B', [Validators.maxLength(50)]],
    city: ['Ciudad Ejemplo', [Validators.required, Validators.maxLength(255)]],
    state: ['Estado Ejemplo', [Validators.required, Validators.maxLength(255)]],
    reference: ['Cerca del parque', [Validators.maxLength(255)]],
    zip: ['12345', [Validators.required, Validators.maxLength(10)]],
    lat: [19.432608, [Validators.pattern(/^-?\d+(\.\d+)?$/)]],
    lng: [-99.133209, [Validators.pattern(/^-?\d+(\.\d+)?$/)]],
    type: ['Residencial', [Validators.required, Validators.maxLength(50)]],
    id_client: [1, [Validators.required]],
    is_default: [false, [Validators.required]],
  });
  paymentForm:FormGroup = this.fb.group({
    amount: ['', [Validators.required, Validators.min(1)]]
  });
  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute,private cs:ClientsService, private ps:PaymentsService,
   private ms:MessagesService,
    private fb:FormBuilder, private as:AdressService
  ){}

  ngOnInit(): void {
    this.id= this.route.snapshot.paramMap.get('id')+"";
    this.form.controls['is_default'].setValue(this.default[0])
    this.form.controls['type'].setValue(this.types[0])
    this.form.controls['id_client'].setValue(this.id)

    this.refresh()
  }
 async refresh(){
    let u: any = await this.cs.show(this.id).toPromise();
    this.data = u.data;
    this.history = u.payments
    this.address = u.address
    console.log('this client >>>', u);
    this.loaded = true;
  }
  showDialog() {

    this.dialogVisible = true;
    console.log("YEA")
  }
  showDialogAddress() {

    this.dialogVisibleAddress = true;
    console.log("YEA")
  }
  confirmPayment(id:number) {
    this.ms.showConfirmation("¿Está seguro de querer validar el pago?").then((confirm:any) => {
      if (confirm) {
        this.loaded=false
        this.ps.validate({id:id}).subscribe((res:any)=>{
          console.log(res)
          this.ms.showSuccess("Pago validado correctamente")
          this.refresh()
        },(err:any)=>{
          this.loaded=true
          this.ms.showError("No se pudo validar el pago")
        })
       
      } 
    })
  }
  saveAddress(){
    this.as.saveAdress(this.form.value).subscribe((res:any)=>{
      console.log('res',res)
      this.loaded=false
      this.refresh()
      this.dialogVisibleAddress = false
    })
  }
  confirmDeleteAddress(id:number) {
    this.ms.showConfirmation("¿Está seguro de querer eliminar el registro?").then((confirm:any) => {
      if (confirm) {
        this.loaded=false
        this.as.removeAddress(id).subscribe((res:any)=>{
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
  confirmPredefinida(id:number) {
    this.ms.showConfirmation("¿Está seguro de querer establecer la dirección como predefinida?").then((confirm:any) => {
      if (confirm) {
        this.loaded=false
        this.as.predefAddress({
          id:id,
          id_client:this.id,
          type:this.address.find((a:any)=>a.id==id).type
        }).subscribe((res:any)=>{
          console.log(res)
          this.ms.showSuccess("Datos actualizados correctamente")
          this.refresh()
        },(err:any)=>{
          this.loaded=true
          this.ms.showError("No se pudo actualizar el registro")
        })
       
      } 
    })
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  savePayment(){
    if (this.paymentForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('amount', this.paymentForm.value.amount);
      formData.append('file', this.selectedFile);
      formData.append('id_client', this.id);

      this.ps.save(formData).subscribe((res:any)=>{
        console.log('res',res)
        this.loaded=false
        this.refresh()
        this.dialogVisible = false
      },(err:any)=>{
        this.loaded=true
        this.ms.showError("No se pudo guardar el pago")
      })
    } else {
      this.ms.showError("El formulario no es válido o no se ha seleccionado un archivo.")
      
    }
  
  }
}
