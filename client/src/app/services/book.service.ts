import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly uri = 'http://localhost:3000';
  token: string;
  user: object;

  constructor(
    private readonly http: HttpClient
  ) { }

  getBooks(): Observable<Book[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<Book[]>(`/api/books`, { headers })
      .pipe(
        retry(2),
        catchError(this.errorHandler)
      );
  }

  createBook(body: FormData): Observable<Book> {
    this.onLoadToken();

    const headers = new HttpHeaders({
      'x-auth-token': this.token
    });
    return this.http.post<Book>(`/api/book/add`, body, { headers })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getBook(id: string): Observable<Book> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<Book>(`/api/book/${id}`, { headers })
      .pipe(
        retry(2),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.msg || 'It seems you are currently offline');
  }

  onLoadToken() {
    this.token = localStorage.getItem('access_token');
    this.user = JSON.parse(localStorage.getItem('access_user'));
  }
}
