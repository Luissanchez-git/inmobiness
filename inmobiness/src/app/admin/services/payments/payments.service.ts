import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
 uri = environment.appUrl+'payments';

  constructor(private http: HttpClient) { }

  save(data:any) {return this.http.post(`${this.uri}/actions/upload`,data);}
  validate(data:any) {return this.http.post(`${this.uri}/actions/validate`,data);}
  getInfoUser(id:number){
     return this.http.get(`${this.uri}/client/${id}`)
  }
}
