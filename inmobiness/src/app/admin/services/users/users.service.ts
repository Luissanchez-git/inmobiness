import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  uri = environment.appUrl+'userss';

  constructor(private http: HttpClient) { }
  getAll() {return this.http.get(`${this.uri}`);}
  getUser(id:number) {return this.http.get(`${this.uri}/${id}`);}
  addUser(data:any) {
    return this.http.post(`${this.uri}`,data);
  }
  removeUser(id:number) {
    return this.http.delete(`${this.uri}/`+id);
  }
  updateUser(id:number,data:any) {
    return this.http.put(`${this.uri}/`+id,data);
  }
  updatePassword(data:any) {
    return this.http.post(`${this.uri}/updatepassword`,data);
  }
}
