import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivateChild {
  private isBrowser: boolean;
  constructor(private router: Router,    @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId); 
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.isBrowser) {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

      if (isAuthenticated) {
        return true; // Permite el acceso a las rutas hijas
      } else {
        this.router.navigate(['/autenticacion']); // Redirige a la ruta de autenticación
        return false; // Bloquea el acceso
      }
    } else {
      return false;
    }
  }
}
