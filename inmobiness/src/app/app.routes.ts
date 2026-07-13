import { ContactoComponent } from './front/contacto/contacto.component';
import { PackagesComponent } from './front/packages/packages.component';
import { Routes } from '@angular/router';
import { FrontLayoutComponent } from './front/front-layout/front-layout.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { RastreoComponent } from './front/rastreo/rastreo.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import {RegisterComponent} from "./auth/register/register.component";
import { RentarComponent } from './front/home/rentar/rentar.component';
import { ComprarComponent } from './front/home/comprar/comprar.component';
import { ArrendarComponent } from './front/home/arrendar/arrendar.component';
import { VenderComponent } from './front/home/vender/vender.component';
import { FormubicacionComponent } from './front/home/formubicacion/formubicacion.component';
import { PropiedadesComponent } from './front/home/view/propiedades/propiedades.component';
import { AddRecoleccionComponent } from './admin/recoleccion/add-recoleccion/add-recoleccion.component';
import { PreviewComponent } from './front/home/view/preview/preview.component';

export const routes: Routes = [

    {
        path:'', component:FrontLayoutComponent,
        children:[
            {
            path: '',
            loadChildren: () => import('./front/front-layout/front-layout.module').then(x => x.FrontLayoutModule)
            },
            { path:'rastreo', component:RastreoComponent },
            { path:'register', component:RegisterComponent },
            {path: 'packages', component: PackagesComponent},
            {path: 'contacto', component: ContactoComponent},
            {path: 'rentar', component: RentarComponent},
            {path: 'comprar', component: ComprarComponent},
            {path: 'arrendar', component: ArrendarComponent},
            {path: 'vender', component: VenderComponent},
            // {
            //   path: 'ubicacion/:type',
            //   component: FormubicacionComponent
            // },
             {
              path: 'ubicacion/:type',
              component: FormubicacionComponent
            },
            {
              path: 'propiedades',
              component: PreviewComponent
            },
            {path: 'view/propiedad/:id', component: PropiedadesComponent},
            {path: 'view/propiedad/:id/:slug', component: PropiedadesComponent},





        ]
    },
    {
        path:'admin', component:AdminLayoutComponent,
        children:[
            {
            path: '',
            loadChildren: () => import('./admin/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
            },
            {path: 'add/recoleccion', component: AddRecoleccionComponent},


        ]
    },
    { path:'login', component:LoginComponent,canActivate:[AuthGuardService] },
    { path: '**', component: NotFoundComponent }
];
