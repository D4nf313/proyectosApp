import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarProyectosComponent } from './listar-proyectos/listar-proyectos.component';
import { DetalleTareasComponent } from './detalle-tareas/detalle-tareas.component';
import { EditarCrearComponent } from './editar-crear/editar-crear.component';

const routes: Routes = [
  { path: 'listar', component: ListarProyectosComponent },
  { path: 'detalle/:id', component: DetalleTareasComponent },
  {
    path: '**',
    redirectTo: 'listar',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProyectosRoutingModule {}
