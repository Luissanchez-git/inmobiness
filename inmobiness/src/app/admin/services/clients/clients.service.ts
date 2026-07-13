import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  uri = environment.appUrl+'clients';

  constructor(private http: HttpClient) { }
  getAll() {return this.http.get(`${this.uri}`);}
  show(id:number) {return this.http.get(`${this.uri}/`+id);}

  addClient(data:any) {
    return this.http.post(`${this.uri}`,data);
  }
  removeClient(id:number) {
    return this.http.delete(`${this.uri}/`+id);
  }
  updateClient(id:number,data:any) {
    return this.http.put(`${this.uri}/`+id,data);
  }


}
