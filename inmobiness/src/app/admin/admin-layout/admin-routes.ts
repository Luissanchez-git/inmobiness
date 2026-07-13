import { ClientAddComponent } from '../clients/clients/client-add/client-add.component';
import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { UsersComponent } from '../users/users.component';
import { ClientsComponent } from '../clients/clients/clients.component';
import { ClientDataComponent } from '../clients/client-data/client-data.component';
import { RecoleccionComponent } from '../recoleccion/recoleccion.component';
import { RoutesComponent } from '../routes/routes.component';
import { EmployeHomeComponent } from '../employes/employe-home/employe-home.component';
import { EmployeHistoryComponent } from '../employes/employe-history/employe-history.component';
import { AdminGuardService } from '../../services/guards/admin-guard.service';
import { EmployesGuardService } from '../../services/guards/employes-guard.service';
import { UserAddComponent } from '../users/user-add/user-add.component';
import { RouteAddComponent } from '../routes/route-add/route-add.component';
import { RouteViewComponent } from '../routes/route-view/route-view.component';
import { RouteUploadComponent } from '../routes/route-upload/route-upload.component';
import { PropiedadesComponent } from '../propiedades/propiedades.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { HistorialPropiedadesComponent } from '../historialpropiedades/historialpropiedades.component';
import { addPropiedadComponent } from '../propiedades/add-propiedad/add-propiedad.component';

export const AdminLayoutRoutes: Routes = [
    { path: '', component: HistorialPropiedadesComponent, canActivate:[AdminGuardService] },

    { path: 'users', component: UsersComponent,canActivate:[AdminGuardService] },
    { path: 'users/view/:id', component: UserAddComponent,canActivate:[AdminGuardService] },


    { path: 'clients', component: ClientsComponent,canActivate:[AdminGuardService] },
    { path: 'clients/:id', component: ClientDataComponent,canActivate:[AdminGuardService] },
    { path: 'clients/view/:id', component: ClientAddComponent,canActivate:[AdminGuardService] },

    { path: 'propiedades', component: PropiedadesComponent,canActivate:[AdminGuardService] },
    { path: 'propiedades/add', component: addPropiedadComponent,canActivate:[AdminGuardService] },
    { path: 'usuarios', component: UsuariosComponent,canActivate:[AdminGuardService] },
    { path: 'rutas/add', component: RouteAddComponent,canActivate:[AdminGuardService] },
    { path: 'rutas/view/:id', component: RouteViewComponent,canActivate:[AdminGuardService] },
    { path: 'rutas/view/:id/upload', component: RouteUploadComponent, canActivate:[AdminGuardService] },



    //EMPLOYES ROUTES
    { path: 'mis-rutas', component: EmployeHomeComponent, canActivate:[EmployesGuardService] },
    { path: 'propiedad/add', component: addPropiedadComponent, canActivate:[EmployesGuardService] },

    { path: 'mis-rutas/view/:id', component: RouteViewComponent, canActivate:[EmployesGuardService] },
    { path: 'mis-rutas/view/:id/upload', component: RouteUploadComponent, canActivate:[EmployesGuardService] },
    { path: 'history', component: EmployeHistoryComponent,canActivate:[EmployesGuardService] },
]
