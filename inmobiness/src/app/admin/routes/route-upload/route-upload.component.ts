import { Component, OnInit, ViewChild } from '@angular/core';
import { PreloaderComponent } from '../../../shared/preloader/preloader.component';
import { MessagesService } from '../../../services/messages/messages.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { PrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { ProgressBar } from 'primeng/progressbar';
import { BadgeModule } from 'primeng/badge';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JwtHelperService } from '../../../services/jwt/jwt-helper.service';
@Component({
  selector: 'app-route-upload',
  imports: [
    PreloaderComponent,
    ToastModule,
    ConfirmDialogModule,
    FileUploadModule,
    Button,
    BadgeModule,
    RouterLink
  ],
  templateUrl: './route-upload.component.html',
  styleUrl: './route-upload.component.scss',
})
export class RouteUploadComponent implements OnInit{
  loaded: boolean = false;
  files = [];
  totalSize: number = 0;

  @ViewChild('fileUploader') fileUploader?: FileUpload
  url:String= environment.appUrl+'excel/actions/upload';
  id:any = 0
  level:any=0
  constructor(
    private config: PrimeNG,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private us:JwtHelperService,
    private router: Router
  ) {
     this.level = this.us.getUserData().level
  }
  ngOnInit(): void {
    this.id= this.route.snapshot.paramMap.get('id')+"";
    this.loaded=true
    this.level = this.us.getUserData().level
  }
  onBeforeSend(event:any) {
     
    //console.log(this.userData.id)
    event.formData.append('id', this.id);
 }
  onError(res:any){
    console.log('error',res);
    
    let status = res.error.status;
    console.log("STATUS",status)
    if (status === 422) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error de Validación',
        detail: res.error.error.message,
        //sticky: true 
      });
    }  
  }
  onUpload(res:any){
    console.log("RES",res.originalEvent.body);
    res = res.originalEvent.body
    
    if(res.status == "error"){ 
      this.messageService.add({severity:'error', summary:'Error', detail:res.message});
    }else{
      this.messageService.add({
        severity: 'info',
        summary: 'Success',
        detail: 'File Uploaded with Basic Mode',
      });

      if (this.level === 1) { 
        this.router.navigate(['/admin/rutas', this.id]);
      } else {
        this.router.navigate(['/admin/mis-rutas/view', this.id]);
      }
     // this.toaster.add({severity:'success', summary:'Listo', detail:"Datos registrados correctamente"});
    
    }
  }
 
  choose(event: any, callback: any) {
    callback();
  }

 


  onTemplatedUpload() {
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
      life: 3000,
    });
  }

}
