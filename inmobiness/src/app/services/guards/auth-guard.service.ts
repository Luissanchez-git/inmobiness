import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot) {


    if (localStorage.getItem('dpm_'+environment.location)) {
      const tokenInfo:any = this.getDecodedAccessToken(localStorage.getItem('dpm_'+environment.location)+"");
      if(tokenInfo.level==1){
        this.router.navigateByUrl('/admin');
        return false;
      }else if(tokenInfo.level==2){
        this.router.navigateByUrl('/admin/mis-rutas');
        return false;
      }else if(tokenInfo.level==3){
        this.router.navigateByUrl('/admin/mis-rutas');
        return false;
      }else{
        return true;
      }

    }else{
      return true;
    }



    return false;
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }
}
