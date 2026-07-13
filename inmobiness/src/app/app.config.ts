import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation,withEnabledBlockingInitialNavigation } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import {  provideAnimations } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';
import { TokenInterceptorService } from "./services/jwt/token-interceptor.service";
import { AuthErrorInterceptorService } from './services/jwt/http-interceptor.service';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withEnabledBlockingInitialNavigation()),
    provideClientHydration(),
    provideAnimations(),
    MessageService,
    ConfirmationService,
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptorService, multi: true },
    providePrimeNG({
        theme: {
            preset: Lara,
            options: {
                prefix: 'p',
                //darkModeSelector: 'system',
                darkModeSelector: '.my-app-dark',
                cssLayer: false
            }
        }
    }),


  ]
};
