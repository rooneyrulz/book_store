import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly uri: string = `http://localhost:3000`;

  constructor(
    private readonly http: HttpClient
  ) { }

  registerUser(user: string): Observable<Auth> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Auth>(`/users/add`, user, { headers })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.msg);
  }
}

