import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectosRoutingModule } from './proyectos.routing';
import { ListarProyectosComponent } from './listar-proyectos/listar-proyectos.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DetalleTareasComponent } from './detalle-tareas/detalle-tareas.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditarCrearComponent } from './editar-crear/editar-crear.component';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  imports: [
    CommonModule,
    ProyectosRoutingModule,
    NavbarComponent,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    
    
    
    
    
  ],
  declarations: [ListarProyectosComponent, DetalleTareasComponent, EditarCrearComponent],
})
export class ProyectosModule {}
