import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Tarea } from '../../interfaces/proyectos';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ProyectosService {
  private localStorageKey = 'tareas';
  private baseUrl: string = '';
  private isBrowser: boolean;
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.baseUrl = environment.apiUrl;
    this.isBrowser = isPlatformBrowser(this.platformId); // Verificamos si estamos en el navegador
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }
  getTareas(): Observable<Tarea[]> {
    const tareasEnLocal = this.getTareasFromLocalStorage();
    console.log(tareasEnLocal);
    if (tareasEnLocal.length > 0) {
      // Si ya hay tareas en LocalStorage, las devolvemos sin hacer petición al backend
      return of(tareasEnLocal);
    } else {
      // Si no hay tareas en LocalStorage, las obtenemos del backend
      return this.http.get<Tarea[]>(`${this.baseUrl}/todos`).pipe(
        tap((tareas) => this.saveTareasToLocalStorage(tareas)) // Guardamos las tareas obtenidas en LocalStorage
      );
    }
  }

  crearTarea(nuevaTarea) {
    console.log(nuevaTarea);
    const tareas = this.getTareasFromLocalStorage(); // Obtener el array actual de tareas
    nuevaTarea.id = tareas.length + 1; // Asignar un nuevo ID (esto dependerá de cómo manejes los IDs)
    console.log(nuevaTarea);

    const tareaNueva = {
      userId: nuevaTarea.userId,
      id: nuevaTarea.id,
      title: nuevaTarea.title,
      completed: nuevaTarea.completed,
    };
    tareas.push(tareaNueva); // Añadir la nueva tarea al array
    console.log(tareas);
    this.saveTareasToLocalStorage(tareas); // Guardar el array actualizado en LocalStorage
    return of(true);
  }
  // Obtener las tareas desde LocalStorage (solo si estamos en el navegador)
  private getTareasFromLocalStorage(): Tarea[] {
    if (this.isBrowser) {
      const tareas = localStorage.getItem(this.localStorageKey);
      return tareas ? JSON.parse(tareas) : [];
    }
    return [];
  }

  editarTarea(tareaEditada: Tarea) {
    // Obtener el array actual de tareas desde LocalStorage
    const tareas = this.getTareasFromLocalStorage();

    // Encontrar la tarea a editar por su ID
    const index = tareas.findIndex((tarea) => tarea.id === tareaEditada.id);

    if (index !== -1) {
      // Si se encuentra la tarea, actualizamos los valores
      tareas[index] = {
        ...tareaEditada, // Aplicar los nuevos valores
      };

      // Guardar el array actualizado en LocalStorage
      this.saveTareasToLocalStorage(tareas);
      return of(true);
    } else {
      return of(false);
    }
  }

  eliminarTarea(idTarea: number) {
    // Obtener el array actual de tareas desde LocalStorage
    const tareas = this.getTareasFromLocalStorage();

    // Filtrar el array para eliminar la tarea con el ID correspondiente
    const tareasActualizadas = tareas.filter((tarea) => tarea.id !== idTarea);

    // Guardar el array actualizado en LocalStorage
    this.saveTareasToLocalStorage(tareasActualizadas);
    return of(true);
  }

  // Guardar las tareas en LocalStorage (solo si estamos en el navegador)
  private saveTareasToLocalStorage(tareas: Tarea[]) {
    if (this.isBrowser) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(tareas));
      return of(true);
    } else {
      return of(false);
    }
  }
}
