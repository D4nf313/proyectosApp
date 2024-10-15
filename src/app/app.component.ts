import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutenticacionComponent } from './autenticacion/autenticacion.component';
import { HttpClientModule } from '@angular/common/http';
import { ProyectosModule } from './proyectos/proyectos.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AutenticacionComponent,
    ProyectosModule,
    HttpClientModule,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'proyectosApp';
}
