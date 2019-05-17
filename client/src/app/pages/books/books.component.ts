import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BookService } from '../../services/book.service';

import { Book } from '../../models/book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  booksList: Book[] = [];
  loading: boolean;
  error: string;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly bookService: BookService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    setTimeout(() => this.fetchBooks(), 500);
  }

  fetchBooks() {
    this.bookService.getBooks().subscribe((data: Book[]) => {
      if (data.length >= 1) {
        this.booksList = [...data];
        this.loading = false;
      }
    }, error => {
      this.error = error;
      this.loading = false;
    });
  }

  onHandleLook(id: string) {
    this.router.navigate(['book', id]);
  }

}
