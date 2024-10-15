import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users = [
    { username: 'user1', password: '1234' },
    { username: 'user2', password: 'password2' },
  ];
  private readonly storageKey = 'isAuthenticated';

  getUsers() {
    return this.users;
  }

  isAuthenticated() {
    return localStorage.getItem(this.storageKey) === 'true';
  }

  constructor() {}
}
