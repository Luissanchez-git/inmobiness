
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthErrorInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      
      catchError((error: HttpErrorResponse) => {
        //console.log("INTERCEPTOR",error)
        if (error.status === 401) {
          // Aquí puedes limpiar el token o cualquier otra lógica de logout
          //localStorage.removeItem('dpm_token'); // si quieres limpiar el token
          localStorage.removeItem('dpm_'+environment.location+"_user")
          localStorage.removeItem('dpm_'+environment.location)
          // Redireccionar al login
          //this.router.navigate(['/login']);
          location.href= "/"
        }

        // Puedes manejar otros errores también si deseas
        return throwError(() => error);
      })
    );
  }
}
