import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {


  uri = environment.appUrl+'attributes';


  constructor(private http: HttpClient) { }
  getAllAttributes() {return this.http.get(`${this.uri}`);}

}
