import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Importa RouterModule si necesitas navegación
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-autenticacion',
  standalone: true,
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class AutenticacionComponent implements OnInit {
  registerForm: FormGroup;

  private _snackBar = inject(MatSnackBar);
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      user: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      const { user, password } = this.registerForm.value;
      const users = this.authService.getUsers();
      console.log(users, user, password);
      // Verificar las credenciales en el componente
      const validUser = users.find(
        (u) => u.username === user && u.password === password
      );
      if (validUser) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser', user);
        this.router.navigate(['/proyectos/listar']);

        // Redirigir o manejar sesión
      } else {
        this._snackBar.open('Las credenciales son incorrectas.', 'Entendido', {
          duration: 3000, // Duración de 5 segundos
        });
        localStorage.setItem('isAuthenticated', 'false');
      }
    }
  }
}
