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
    {
        path: 'registrar-carga',
        loadComponent: () =>
            import('./components/registrar-carga/registrar-carga.component').then((c) => c.RegistrarCargaComponent),
        data: { showNavbar: true, showFooter: true },
    },
    {
        path: 'cargas',
        loadComponent: () =>
            import('./components/cargas/cargas.component').then((c) => c.CargasComponent),
        data: { showNavbar: true, showFooter: true },
    },
    {
        path: 'informes',
        loadComponent: () =>
            import('./components/informes/informes.component').then((c) => c.InformesComponent),
        data: { showNavbar: true, showFooter: true },
    },
    



];

