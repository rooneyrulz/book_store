import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly uri: string = 'http://localhost:3000';
  token: string;
  user: object;

  constructor(
    private readonly http: HttpClient
  ) { }

  fetchBooks(): Observable<Book[]> {
    this.onLoadToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': this.token
    });
    return this.http.get<Book[]>(`${this.uri}/api/user/books`, { headers })
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  deleteItem(id: string): Observable<Book> {
    this.onLoadToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': this.token
    });
    return this.http.delete<Book>(`${this.uri}/api/book/${id}`, { headers })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.msg || 'It seems you are currently offline');
  }

  onLoadToken(): void {
    this.token = localStorage.getItem('access_token');
    this.user = JSON.parse(localStorage.getItem('access_user'));
  }
}
