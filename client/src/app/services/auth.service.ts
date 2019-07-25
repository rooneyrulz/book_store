import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly uri: string = 'http://localhost:3000';
  token: string;
  user: object;

  constructor(
    private readonly http: HttpClient
  ) {}

  // Authenticate User
  authenticateUser(body: string): Observable<Auth> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Auth>(`/user/auth`, body, { headers })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Store token and user on local storage
  storeToken(token: string, user: object): void {
    localStorage.setItem('access_token', token);
    localStorage.setItem('access_user', JSON.stringify(user));
  }

  // Check weather token and user beign saved on local storage
  isAuthenticated(): boolean {
    return localStorage.getItem('access_token') !== null && localStorage.getItem('access_user') !== null;
  }

  // Get auh user
  loadAuthUser(): Observable<User> {
    this.onLoadToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': this.token
    });
    return this.http.get<User>(`/user/auth/user`, { headers });
  }

  // Logout user
  logOutUser(): void {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  // Error handler method
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.msg);
  }

  // Get token and user from local storage
  onLoadToken() {
    this.token = localStorage.getItem('access_token');
    this.user = JSON.parse(localStorage.getItem('access_user'));
  }
}
