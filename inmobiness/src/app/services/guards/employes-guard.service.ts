import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class EmployesGuardService {
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    
    if (localStorage.getItem('dpm_'+environment.location)) { 
      const tokenInfo:any = this.getDecodedAccessToken(localStorage.getItem('dpm_'+environment.location)+"");
      if(tokenInfo.level==2){
        return true
      }else{
        
        this.router.navigateByUrl('/');
        return false; 
      }
     
    }
    localStorage.removeItem('dpm_'+environment.location);
    this.router.navigateByUrl('/');
  
    
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
