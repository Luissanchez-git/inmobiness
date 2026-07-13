import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdressService {
  uri = environment.appUrl+'address';
  

  constructor(private http: HttpClient) { }
  getClientAddress(id:number) {return this.http.get(`${this.uri}/${id}`);}
  saveAdress(data:any) {return this.http.post(`${this.uri}`,data);}
  removeAddress(id:number) {return this.http.delete(`${this.uri}/${id}`);}
  
  predefAddress(data:any) {return this.http.post(`${this.uri}/actions/predef`,data);}
}
