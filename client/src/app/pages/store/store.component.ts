import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from '../../services/store.service';

import { Book } from '../../models/book.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  booksList: Book[] = [];
  loading: boolean;
  error: string;

  constructor(
    private readonly router: Router,
    private readonly storeService: StoreService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    setTimeout(() => this.getBooks(), 500);
  }

  getBooks() {
    this.storeService.fetchBooks().subscribe((data: Book[]) => {
      if (data) {
        this.booksList = [...data];
        this.loading = false;
      }
    }, error => {
      this.error = error;
      this.loading = false;
    });
  }

  onDeleteCartItem(id: string) {
    if (confirm('Are you want to remove this book..?')) {
      this.storeService.deleteItem(id).subscribe(data => {
        if (data) {
          window.location.href = '/store';
        }
      }, error => {
        this.error = error;
      });
    } else {
      this.router.navigate(['/store']);
    }
  }

}
