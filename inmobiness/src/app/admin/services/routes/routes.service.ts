import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  uri_routes  = environment.appUrl+'excel';
  uri= environment.appUrl+'routess';

  constructor(private http: HttpClient) { }

  get() {return this.http.get(`${this.uri}`);}
  show(id:any) {return this.http.get(`${this.uri}/${id}`);}
  getData(data:any) {return this.http.post(`${this.uri}/actions/get_data`,data);}
  import() {return this.http.post(`${this.uri_routes}`,{});}

  saveRoute(data:any) { return this.http.post(`${this.uri}`,data);}
  removeRoute(id:any) { return this.http.delete(`${this.uri}/${id}`);}
  removeFromRoute(id:any) { return this.http.post(`${this.uri}/actions/remove_from_route/`,{id:id});}

  uploadFile(data:any) {return this.http.post(`${this.uri}/actions/upload`,data);}

}
