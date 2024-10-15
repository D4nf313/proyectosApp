import { Routes } from '@angular/router';
import { AutenticacionComponent } from './autenticacion/autenticacion.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'autenticacion',
    component: AutenticacionComponent,
  },
  {
    path: 'proyectos',
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./proyectos/proyectos.module').then((m) => m.ProyectosModule),
  },
  {
    path: '**',
    redirectTo: 'proyectos',
  },
];
