import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  options: any;
  urlAuth = environment.appUrl;
  urlUser=environment.appUrl+"userdata"
  registerUserUrl = environment.appUrl.replace('api/','api/register')
  constructor(private http: HttpClient,private router: Router) {

    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
  }
  login(e: string, p: string) {
     return this.http.post(`${this.urlAuth}api/login`, {
       email: e,
       password: p,
     }, this.options);
   }
  /**
   * Revoke the authenticated user token
   */
  userData(){
     this.options.headers.Authorization = 'Bearer ' + localStorage.getItem('dcfe_'+environment.location);
     var headers_object = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('dcfe_'+environment.location)
     })
     const httpOptions = {
       headers: headers_object
     };
     return this.http.post(this.urlUser,null );
  }
  logout() {
    this.options.headers.Authorization = 'Bearer ' + localStorage.getItem('dcfe_'+environment.location);
    return this.http.post(environment.appUrl+'logout' , null,this.options);
  }
  redirectLogout(){
    this.logout().subscribe((e:any) => { console.log('LOGOUT ', e) })
    localStorage.removeItem('dcfe_'+environment.location);

    this.router.navigate(['/login']);
  }


  register(data: any ):  Observable<any> {
    console.log('data', data);
    return this.http.post(environment.appUrl+'register', data);

  }

}
