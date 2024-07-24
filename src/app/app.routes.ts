import { Routes } from '@angular/router';

// Componenets
import { HomeComponent } from './components/pages/home/home.component';
import { RoomsComponent } from './components/pages/rooms/rooms.component';
import { CheckInsBookingsComponent } from './components/pages/check-ins-bookings/check-ins-bookings.component';
import { ClientsComponent } from './components/pages/clients/clients.component';
import { AuthorizationComponent } from './components/pages/authorization/authorization.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';

// Guards
import { AuthGuard } from './auth/auth.guard';



export const routes: Routes = [
    {path: '', component: HomeComponent, canActivate:[AuthGuard]},
    {path: 'rooms', component: RoomsComponent, canActivate:[AuthGuard]},
    {path: 'check-ins-bookings', component: CheckInsBookingsComponent, canActivate:[AuthGuard]},
    {path: 'clients', component: ClientsComponent, canActivate:[AuthGuard]},
    {path:'authorization', component:AuthorizationComponent},
    {path: '**', component: PageNotFoundComponent},

];
