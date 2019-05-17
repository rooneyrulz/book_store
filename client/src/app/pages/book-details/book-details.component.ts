import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BookService } from '../../services/book.service';

import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  loading: boolean;
  book: Book;
  paramId: string;
  error: string;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly bookService: BookService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.paramId = this.route.snapshot.paramMap.get('id');

    setTimeout(() => this.getBook(), 500);
  }

  getBook() {
    this.bookService.getBook(this.paramId).subscribe((data: Book) => {
      if (data) {
        this.book = data;
        this.loading = false;
      }
    }, error => {
      this.error = error;
      this.loading = false;
    });
  }

  onHandlePrev() {
    this.router.navigate(['']);
  }

}
