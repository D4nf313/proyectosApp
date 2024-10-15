import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../services/proyectos/proyectos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-proyectos',
  templateUrl: './listar-proyectos.component.html',
  styleUrls: ['./listar-proyectos.component.css'],
})
export class ListarProyectosComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'tel', 'company', 'action'];
  dataSource: MatTableDataSource<any>;

  constructor(
    private proyectoService: ProyectosService,
   private router: Router
  ) {}

  ngOnInit() {
    this.proyectoService.getUsers().subscribe((data: any) => {
      console.log(data);
      this.dataSource = data;
    });
  }

  detalle(id, name) {
   this.router.navigate([`proyectos/detalle/${id}`], {
    queryParams: {  nombre: name }
  });
  }
}/* 
    this.router.navigate(['/proyectos/detalle'], {
      queryParams: { id: id, nombre: nombre }
    });
 */