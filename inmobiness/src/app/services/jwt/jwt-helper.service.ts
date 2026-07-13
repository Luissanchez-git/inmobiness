import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtHelperService {

  userData:any=[]
  token:any
  imgNew=""
  constructor() { 
    /*if (localStorage.getItem('dpm_'+environment.location) == null) { 
      location.href="/login"
      window.location.reload()
      
    }*/
   if(localStorage.getItem('dpm_'+environment.location)){
    this.token = this.getDecodedAccessToken(localStorage.getItem('dpm_'+environment.location)+"");
    
    this.userData={
      id:this.token.id,
      img: this.imgNew == "" ? this.token.img : this.imgNew,
      name:this.token.name,
      level:this.token.level,
      email:this.token.email
    }
   
   }

  
  }
  /**
   * Decode a JWT token
   *
   * @param token The token to decode
   */
  private decode(token: string) {
    if (token !== null || token !== undefined) {
      const base64Url = token.split('.')[1];
      if (base64Url === null || base64Url === undefined) {
        return null;
      }
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    } else {
      return null;
    }
  }
  /**
   * Get an attribute value from the access token
   *
   * @param attribute The attribute's key
   */
  private attr(attribute: string): string {
    const token = localStorage.getItem('dpm_'+environment.location);
    if (token === null || token === undefined) {
      return "";
    } else {
      const decoded = this.decode(token);
      return (decoded === null) ? "" : decoded[attribute];
    }
  }
  /**
   * Get authenticated user's id
   */
  id(): number {
    return +this.attr('id');
  }
  /**
   * Get authenticated user's name
   */
  name(): string {
    return this.attr('name') as string;
  }
  /**
   * Get authenticated user's email
   */
  email(): string {
    return this.attr('email') as string;
  }
  updateImg(img:string){
    this.imgNew= img
    this.userData.img =  img
  }
  getUserData():any{return this.userData}
  getToken():any{return this.token}
  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('dpm_'+environment.location);
    if (token === null || token === undefined) {
      return false;
    } else {
      const decoded = this.decode(token);
      return (decoded !== null && decoded.exp > Date.now() / 1000);
    }
  }
}
