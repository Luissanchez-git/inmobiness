import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  uri = environment.appUrl+'packagess';



  constructor(private http: HttpClient) { }
  getAll() {return this.http.get(`${this.uri}`);}
  get(track_number:any) {return this.http.get(`${this.uri}/${track_number}`);}
  getPackageByClient(id:any){
    return this.http.get(`${this.uri}/client/${id}`);
  }
  postPackage( data:any){
    return this.http.post(`${this.uri}`, data);
  }
  getByStatus(id:number) {return this.http.get(`${this.uri}/actions/filter/${id}`);}
  cancelPackage(id:number) {return this.http.delete(`${this.uri}/`+id);}

}
