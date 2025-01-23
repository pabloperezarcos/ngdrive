import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(c => c.DashboardComponent),
        data: { showNavbar: false, showFooter: false }
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(c => c.DashboardComponent),
        data: { showNavbar: false, showFooter: false }
    },
    {
        path: 'vehiculos',
        loadComponent: () => import('./components/vehiculos/vehiculos.component').then(c => c.VehiculosComponent),
        data: { showNavbar: true, showFooter: true }
    },


];

