import { Component, OnInit } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { JwtHelperService } from '../../../services/jwt/jwt-helper.service';
import { environment } from '../../../../environments/environment';

import { Router, RouterLink } from '@angular/router';

@Component({
    standalone:true,
    selector: 'app-header',
    imports: [IconFieldModule, InputIconModule, InputTextModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  constructor(private auth:JwtHelperService,private router: Router){}
  userName:string = ""
  userImg:string = ""
  division:string = ""
  url:string = environment.appUrl;
  imgdefault = environment.appUrl+"users/default.jpg"
  logout(): void {

    localStorage.removeItem('dpm_'+environment.location);
    // this.router.navigate(['/login']);
   //location.href="/"
    this.router.navigate(['/login']);

}
  ngOnInit(){

      this.userName =this.auth.getUserData().name
      this.userImg = environment.appUrl+'users/'+ this.auth.getUserData().img
  }
  onImgError(event:any){
    event.target.src = this.imgdefault
   }

}
