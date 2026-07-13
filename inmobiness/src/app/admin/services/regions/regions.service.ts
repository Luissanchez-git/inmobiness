import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {
  uri = environment.appUrl+'regions';
  uri_zones = environment.appUrl+'zones';

  constructor(private http: HttpClient) { }
  getAll() {return this.http.get(`${this.uri}`);}
  getZonesAll() {return this.http.get(`${this.uri_zones}`);}
  
}
