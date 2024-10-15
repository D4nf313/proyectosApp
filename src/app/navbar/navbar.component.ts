import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
})
export class NavbarComponent implements OnInit {
  user;
  constructor(private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.user = localStorage.getItem('currentUser');
    }
  }

  logout() {
    localStorage.setItem('isAuthenticated', 'false');
    this.router.navigate(['/autenticacion']);
    localStorage.removeItem('tareas'); 
  }
}
