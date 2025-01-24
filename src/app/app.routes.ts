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
    {
        path: 'crear-vehiculo',
        loadComponent: () => import('./components/crear-vehiculo/crear-vehiculo.component').then(c => c.CrearVehiculoComponent),
        data: { showNavbar: true, showFooter: true }
    },
    {
        path: 'editar-vehiculo/:id',
        loadComponent: () => import('./components/editar-vehiculo/editar-vehiculo.component').then((c) => c.EditarVehiculoComponent),
        data: { showNavbar: true, showFooter: true },
    },


];

