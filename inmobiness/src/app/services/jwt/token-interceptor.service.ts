import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  urlsToNotUse: Array<string>;
  constructor() {
      this.urlsToNotUse= [
        'payments/actions/upload',
        'excel/actions/upload'
        //'conciliacion/actions/upload'
      ];
    }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     
     
    if (this.isValidRequestForInterceptor(req.url)) {
      
      const token = localStorage.getItem('dpm_'+environment.location);
      if (token) {
        req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
      }
      if (!req.headers.has('Content-Type') && !(req.body instanceof FormData)) {
          req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
      }
      req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    }
    //console.log(req)
    return next.handle(req);
  }
  private isValidRequestForInterceptor(requestUrl: string): boolean {

    //var rawURL = requestUrl.replace(environment.appUrl,'');
    var rawURL = ""
    if(requestUrl.includes("/costos/")){
      let u =  environment.appUrl.replace('api','costos')
      rawURL  = requestUrl.replace(u,'');
    }else if(requestUrl.includes("/dft/")){
      let u =  environment.appUrl.replace('api','dft')
      rawURL  = requestUrl.replace(u,'');
    }else{
      rawURL  = requestUrl.replace(environment.appUrl,'');
    }
   // console.log(rawURL)
    for(let address of this.urlsToNotUse){
     // console.log(address, rawURL,address == rawURL)
      if(address == rawURL){
        return false
      };
    }
  
    return true;
  }
}
