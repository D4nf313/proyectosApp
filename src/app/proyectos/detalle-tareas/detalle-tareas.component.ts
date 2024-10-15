import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ProyectosService } from '../../services/proyectos/proyectos.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditarCrearComponent } from '../editar-crear/editar-crear.component';
import { ActivatedRoute } from '@angular/router';
import { DialogEliminar } from '../borrar-tarea/dialog-eliminar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalle-tareas',
  templateUrl: './detalle-tareas.component.html',
  styleUrls: ['./detalle-tareas.component.css'],
})
export class DetalleTareasComponent implements OnInit {
  displayedColumns: string[] = ['title', 'completed', 'action'];
  dataSource = new MatTableDataSource<any>();
  private _snackBar = inject(MatSnackBar);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  resultsLength = 0;
  id: number;
  nombre: string;
  constructor(
    private proyectosService: ProyectosService,
    public dialog: MatDialog,
    private aRoute: ActivatedRoute
  ) {
    this.id = +this.aRoute.snapshot.params['id'];
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.cargarData();
    this.aRoute.queryParams.subscribe((params) => {
      this.nombre = params['nombre'];
    });
  }

  cargarData() {
    this.proyectosService.getTareas().subscribe((data) => {
      const tareasUser = data.filter((tarea: any) => tarea.userId === this.id);
      console.log(tareasUser);
      this.dataSource.data = tareasUser;
      this.resultsLength = tareasUser.length;
    });
  }

  editar(data) {
    console.log(data);
    const dialogRef = this.dialog.open(EditarCrearComponent, {
      width: '500px',
      data: { tarea: data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarData();
        this.table.renderRows();
      }
    });
  }

  crear() {
    const dialogRef = this.dialog.open(EditarCrearComponent, {
      width: '500px',
      data: { userId: this.id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarData();
        this.table.renderRows();
      }
    });
  }
  eliminar(id) {
    console.log(id);
    const dialogRef = this.dialog.open(DialogEliminar, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.proyectosService.eliminarTarea(id).subscribe((rta: boolean) => {
          if (rta) {
            this._snackBar.open(
              'Se ha eliminado la tarea exitosamente.',
              'Entendido',
              {
                duration: 3000, // Duración de 5 segundos
              }
            );
            this.cargarData();
            this.table.renderRows();
          }
        });
      }
    });
  }
}
