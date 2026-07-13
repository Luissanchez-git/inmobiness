import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {


  uri = environment.appUrl+'cotizacion';
  

  constructor(private http: HttpClient) { }
  getShowData() {return this.http.get(`${this.uri}`);}
 
}
