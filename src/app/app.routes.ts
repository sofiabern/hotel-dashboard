import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';



export const routes: Routes = [
    {path: '', loadComponent: () => import("./components/pages/home/home.component").then((m) => m.HomeComponent), canActivate:[AuthGuard]},

    {path: 'rooms', loadComponent: () => import('./components/pages/rooms/rooms.component').then((m) => m.RoomsComponent), canActivate:[AuthGuard]},

    {path: 'check-ins-bookings', loadComponent: () => import("./components/pages/check-ins-bookings/check-ins-bookings.component").then((m) => m.CheckInsBookingsComponent), canActivate:[AuthGuard]},

    {path: 'clients', loadComponent: () => import("./components/pages/clients/clients.component").then((m) => m.ClientsComponent), canActivate:[AuthGuard]},

    {path:'authorization',loadComponent: () => import("./components/pages/authorization/authorization.component").then((m) => m.AuthorizationComponent)},

    {path: '**', loadComponent: () => import("./components/pages/page-not-found/page-not-found.component").then((m) => m.PageNotFoundComponent)},

];
