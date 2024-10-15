import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptor ejecutado'); // Agrega este log

    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error inesperado.';

        if (error.error instanceof ErrorEvent) {
          // Errores del lado del cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Errores del lado del servidor
          switch (error.status) {
            case 400:
              errorMessage = 'Solicitud incorrecta. Verifica los datos ingresados.';
              break;
            case 401:
              errorMessage = 'No estás autorizado. Por favor, inicia sesión.';
              break;
            case 404:
              errorMessage = 'Recurso no encontrado.';
              break;
            case 500:
              errorMessage = 'Error interno del servidor. Inténtalo de nuevo más tarde.';
              break;
            default:
              errorMessage = `Error desconocido: ${error.status}`;
          }
        }

        this.showSnackbar(errorMessage);
        return throwError(() => error);
      })
    );
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
    });
  }
}
